import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Recipe } from './recipe.entity';

@Entity({ name: 'category' })
export class Category extends Base {
  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => Recipe, (recipe) => recipe.category)
  recipes: Recipe[];
}
