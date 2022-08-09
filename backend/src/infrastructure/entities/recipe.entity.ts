import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Category } from './category.entity';
import { IngredientRecipe } from './ingredient-recipe.entity';
import { Review } from './review.entity';
import { Step } from './step.entity';
import { User } from './user.entity';

@Entity({ name: 'recipe' })
export class Recipe extends Base {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'note', nullable: true })
  note: string;

  @Column({ name: 'videoPath', nullable: true })
  videoPath: string;

  @Column({ name: 'nutritionValue', nullable: true })
  nutritionValue: string;

  @Column({ name: 'totalCalories', nullable: true })
  totalCalories: number;

  @Column({
    name: 'prepTime',
    type: 'timestamp with time zone',
    nullable: true,
  })
  prepTime: string;

  @Column({ name: 'cookTime', type: 'timestamp with time zone' })
  cookTime: string;

  @Column({
    name: 'postTime',
    type: 'timestamp with time zone',
    nullable: true,
  })
  postTime: string;

  @Column({ name: 'servings', nullable: true })
  servings: number;

  @ManyToOne(() => User, (user) => user.recipes, { eager: true })
  user: User;

  @OneToMany(
    () => IngredientRecipe,
    (ingredientRecipe) => ingredientRecipe.recipe,
  )
  ingredient: IngredientRecipe[];

  @OneToMany(() => Review, (review) => review.recipe)
  reviews: Review[];

  @ManyToOne(() => Category, (category) => category.recipes)
  category: Category;

  @OneToMany(() => Step, (step) => step.recipe)
  steps: Step[];

  get userId(): string {
    return this.user?.id;
  }
}
