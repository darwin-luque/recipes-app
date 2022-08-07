import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Recipe } from './recipe.entity';
import { Reply } from './reply.entity';
import { Review } from './review.entity';

export enum UserRole {
  Admin = 'Admin',
  Chef = 'Chef',
  Taster = 'Taster',
}

@Entity({ name: 'user' })
export class User extends Base {
  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'role', type: 'enum', enum: UserRole })
  role: UserRole;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Reply, (reply) => reply.user)
  replies: Review[];
}
