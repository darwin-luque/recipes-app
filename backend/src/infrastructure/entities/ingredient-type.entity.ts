import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Ingredient } from './ingredient.entity';

@Entity({ name: 'ingredient_type' })
export class IngredientType extends Base {
  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.type)
  ingredient: Ingredient[];
}
