import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Article {

  @CreateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @Column({ type: 'varchar', name: 'title', length: 200 })
  title: string;

  @Column({ type: 'varchar', name: 'content', length: 200 })
  content: string;

  @Column({ type: 'integer', name: 'likes'})
  likes: number;

  @Column({ type: 'integer', name: 'dislikes'})
  dislikes: number;

  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  author: User;

  @PrimaryGeneratedColumn('uuid', { name: 'article_id' })
  articleId: string;

}
