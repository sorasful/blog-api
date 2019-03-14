import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Article } from '../../article/entity/article.entity';
import { getOrDefault, getCopyConstruction } from '../../utils/copy-constructor.tools';

@Entity()
export class Comment {

  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  author: User;
  
  @ManyToOne(type => Article, article => article.comments, { onDelete: "CASCADE" })
  article: Article
  
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

  constructor(copy: Partial<Comment> = {}) {
    this.commentId = getOrDefault(copy.commentId, undefined) as any
    this.author = getCopyConstruction(User, copy.author) as any
    this.article = getCopyConstruction(Article, copy.article) as any
    this.content = getOrDefault(copy.content, undefined)
  }
}
