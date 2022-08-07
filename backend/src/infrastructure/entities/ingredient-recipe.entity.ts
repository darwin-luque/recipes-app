import { Column, Entity, ManyToOne } from 'typeorm';
import { Units } from '../../utils/constants/units.enum';
import { Base } from './base.entity';
import { Ingredient } from './ingredient.entity';
import { Recipe } from './recipe.entity';

@Entity({ name: 'ingredient_recipe' })
export class IngredientRecipe extends Base {
  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredient: Ingredient;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredient)
  recipe: Recipe;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'unit', enum: Units, type: 'enum' })
  unit: Units;
}
