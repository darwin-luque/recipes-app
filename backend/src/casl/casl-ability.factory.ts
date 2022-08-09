import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  MongoQuery,
} from '@casl/ability';
import { IngredientRecipe } from '../infrastructure/entities/ingredient-recipe.entity';
import { IngredientType } from '../infrastructure/entities/ingredient-type.entity';
import { Ingredient } from '../infrastructure/entities/ingredient.entity';
import { User, UserRole } from '../infrastructure/entities/user.entity';
import { Category } from '../infrastructure/entities/category.entity';
import { Recipe } from '../infrastructure/entities/recipe.entity';
import { Review } from '../infrastructure/entities/review.entity';
import { Reply } from '../infrastructure/entities/reply.entity';
import { Step } from '../infrastructure/entities/step.entity';
import { CaslAction } from '../utils/constants/casl-action.enum';

type Subjects =
  | InferSubjects<
      | typeof Category
      | typeof IngredientType
      | typeof User
      | typeof IngredientRecipe
      | typeof Ingredient
      | typeof Recipe
      | typeof Step
      | typeof Reply
      | typeof Review
    >
  | 'all';

export type AppAbility = Ability<[CaslAction, Subjects]>;

type Builder = AbilityBuilder<
  Ability<[CaslAction, Subjects], MongoQuery<Record<string, unknown>>>
>;

export class CaslAbilityFactory {
  createForUser(payload: TokenPayload): Ability<[CaslAction, Subjects]> {
    const builder = new AbilityBuilder<Ability<[CaslAction, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    this.setAdminAbilities(builder, payload);
    this.setCategoryAbilities(builder);
    this.setIngredientTypeAbilities(builder);
    this.setUserAbilities(builder, payload);
    this.setIngredientRecipeAbilities(builder, payload);
    this.setIngredientAbilities(builder);
    this.setRecipeAbilities(builder, payload);
    this.setStepAbilities(builder, payload);
    this.setReplyAbilities(builder, payload);
    this.setReviewAbilities(builder, payload);

    return builder.build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  // Global abilities for admin users, set respectively were they don't have a specific ability
  setAdminAbilities({ can }: Builder, payload: TokenPayload) {
    if (payload.role === UserRole.Admin) {
      can(CaslAction.Manage, 'all');
    }
  }

  setCategoryAbilities({ can }: Builder) {
    can(CaslAction.Read, Category);
  }

  setIngredientTypeAbilities({ can }: Builder) {
    can(CaslAction.Read, IngredientType);
  }

  setUserAbilities({ can, cannot }: Builder, payload: TokenPayload) {
    switch (payload.role) {
      case UserRole.Admin:
        cannot(CaslAction.Update, User, { id: { $ne: payload.sub } });
        break;
      case UserRole.Chef:
      case UserRole.Taster:
        can(CaslAction.Update, User, { id: { $eq: payload.sub } });
        can(CaslAction.Delete, User, { id: { $eq: payload.sub } });
    }
    can(CaslAction.Read, User);
  }

  setIngredientRecipeAbilities(
    { can, cannot }: Builder,
    payload: TokenPayload,
  ) {
    switch (payload.role) {
      case UserRole.Admin:
        cannot(CaslAction.Update, IngredientRecipe, {
          userId: { $ne: payload.sub },
        });
        cannot(CaslAction.Delete, IngredientRecipe, {
          userId: { $ne: payload.sub },
        });
        break;
      case UserRole.Chef:
        can(CaslAction.Create, IngredientRecipe);
        can(CaslAction.Update, IngredientRecipe, {
          userId: { $eq: payload.sub },
        });
        can(CaslAction.Delete, IngredientRecipe, {
          userId: { $eq: payload.sub },
        });
    }
    can(CaslAction.Read, User);
  }

  // Only an admin can manage ingredients, rest can only read them
  setIngredientAbilities({ can }: Builder) {
    can(CaslAction.Read, User);
  }

  setRecipeAbilities({ can, cannot }: Builder, payload: TokenPayload) {
    switch (payload.role) {
      case UserRole.Admin:
        cannot(CaslAction.Update, Recipe, {
          userId: { $ne: payload.sub },
        });
        break;
      case UserRole.Chef:
        can(CaslAction.Create, Recipe);
        can(CaslAction.Update, Recipe, {
          userId: { $eq: payload.sub },
        });
        can(CaslAction.Delete, Recipe, {
          userId: { $eq: payload.sub },
        });
    }
    can(CaslAction.Read, Recipe);
  }

  setStepAbilities({ can, cannot }: Builder, payload: TokenPayload) {
    switch (payload.role) {
      case UserRole.Admin:
        cannot(CaslAction.Update, Step, {
          userId: { $ne: payload.sub },
        });
        cannot(CaslAction.Delete, IngredientRecipe, {
          userId: { $ne: payload.sub },
        });
        break;
      case UserRole.Chef:
        can(CaslAction.Create, Step);
        can(CaslAction.Update, Step, {
          userId: { $eq: payload.sub },
        });
        can(CaslAction.Delete, Step, {
          userId: { $eq: payload.sub },
        });
    }
    can(CaslAction.Read, Step);
  }

  setReplyAbilities({ can, cannot }: Builder, payload: TokenPayload) {
    switch (payload.role) {
      case UserRole.Admin:
        cannot(CaslAction.Update, Reply, {
          userId: { $ne: payload.sub },
        });
        cannot(CaslAction.Delete, Reply, {
          userId: { $ne: payload.sub },
        });
        break;
      case UserRole.Chef:
      case UserRole.Taster:
        can(CaslAction.Create, Reply);
        can(CaslAction.Update, Reply, {
          userId: { $eq: payload.sub },
        });
        can(CaslAction.Delete, Reply, {
          userId: { $eq: payload.sub },
        });
    }
    can(CaslAction.Read, Reply);
  }

  setReviewAbilities({ can, cannot }: Builder, payload: TokenPayload) {
    switch (payload.role) {
      case UserRole.Admin:
        cannot(CaslAction.Update, Review, {
          userId: { $ne: payload.sub },
        });
        cannot(CaslAction.Delete, Review, {
          userId: { $ne: payload.sub },
        });
        break;
      case UserRole.Chef:
      case UserRole.Taster:
        can(CaslAction.Create, Review);
        can(CaslAction.Update, Review, {
          userId: { $eq: payload.sub },
        });
        can(CaslAction.Delete, Review, {
          userId: { $eq: payload.sub },
        });
    }
    can(CaslAction.Read, Review);
  }
}
