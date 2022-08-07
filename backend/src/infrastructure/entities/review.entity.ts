import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Recipe } from './recipe.entity';
import { Reply } from './reply.entity';
import { User } from './user.entity';

@Entity({ name: 'review' })
export class Review extends Base {
  @Column({ name: 'rating' })
  rating: number;

  @Column({ name: 'body' })
  body: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Recipe, (recipe) => recipe.reviews)
  recipe: Recipe;

  @OneToMany(() => Reply, (reply) => reply.review)
  replies: Review[];
}
