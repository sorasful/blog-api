import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Comment {

  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  author: User;
  
  @CreateDateColumn()
  created: Date;

  @Column({ type: 'varchar', name: 'email', length: 200 })
  email: string;

  @Column({ type: 'varchar', name: 'author_id', length: 200 })
  authorId: string;

  @Column({ type: 'varchar', name: 'content', length: 500 })
  content: string;

  @PrimaryGeneratedColumn('uuid', { name: 'commentaire_id' })
  commentId: string;
}
