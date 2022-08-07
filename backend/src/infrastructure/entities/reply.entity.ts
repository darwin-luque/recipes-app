import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity({ name: 'reply' })
export class Reply extends Base {
  @Column({ name: 'body' })
  body: string;

  @ManyToOne(() => User, (user) => user.replies)
  user: User;

  @ManyToOne(() => Review, (review) => review.replies)
  review: Review;
}
