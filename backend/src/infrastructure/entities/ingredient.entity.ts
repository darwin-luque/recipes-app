import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { IngredientRecipe } from './ingredient-recipe.entity';
import { IngredientType } from './ingredient-type.entity';

@Entity({ name: 'ingredient' })
export class Ingredient extends Base {
  @Column({ name: 'name' })
  name: string;

  @OneToMany(
    () => IngredientRecipe,
    (ingredientRecipe) => ingredientRecipe.ingredient,
  )
  recipes: IngredientRecipe[];

  @ManyToOne(
    () => IngredientType,
    (ingredientType) => ingredientType.ingredient,
  )
  type: IngredientType;
}
