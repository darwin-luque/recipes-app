import { AggregateRoot } from '@nestjs/cqrs';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base extends AggregateRoot {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
