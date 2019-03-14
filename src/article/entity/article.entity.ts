import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { getOrDefault, getCopyConstruction, getCopyConstructions } from '../../utils/copy-constructor.tools';
import { Comment } from '../../comment/entity/comment.entity';

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

  @Column({ type: 'integer', name: 'likes', nullable: true})
  likes: number;

  @Column({ type: 'integer', name: 'dislikes', nullable: true})
  dislikes: number;

  @ManyToOne(type => User, user => user.articles, { eager: true, cascade: true,  onDelete: "CASCADE" })
  author: User

  @OneToMany(type => Comment, comment => comment.article, { eager: true, cascade: true })
  comments: Comment[]

  @PrimaryGeneratedColumn('uuid', { name: 'article_id' })
  articleId: string;

  constructor(copy: Partial<Article> = {}) {
    this.articleId = getOrDefault(copy.articleId, undefined) as any
    this.author = getCopyConstruction(User, copy.author) as any
    this.comments = getCopyConstructions(Comment, copy.comments) as any
    this.content = getOrDefault(copy.content, undefined)
    this.dislikes = getOrDefault(copy.dislikes, undefined)
    this.likes = getOrDefault(copy.likes, undefined)
    this.title = getOrDefault(copy.title, undefined)
  }
}
