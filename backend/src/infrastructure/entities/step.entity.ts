import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Recipe } from './recipe.entity';

@Entity({ name: 'step' })
export class Step extends Base {
  @Column({ name: 'position' })
  position: number;

  @Column({ name: 'body' })
  body: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.steps)
  recipe: Recipe;

  get userId(): string {
    return this.recipe.userId;
  }
}
