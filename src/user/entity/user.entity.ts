import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { getOrDefault, getCopyConstructions } from '../../utils/copy-constructor.tools';
import { Article } from '../../article/entity/article.entity';
import { Comment } from '../../comment/entity/comment.entity';

@Entity()
export class User {

  @CreateDateColumn()
  created: Date;

  @OneToMany(type => Article, article => article.author)
  articles: Article[]

  @OneToMany(type => Comment, comment => comment.author)
  comments: Comment[]
  
  @Column({ type: 'varchar', name: 'email', length: 200 })
  email: string;

  @Column({ type: 'varchar', name: 'first_name', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', name: 'mobile_phone', length: 31 })
  mobilePhone: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @Column({ type: 'varchar', name: 'role', default: 'Utilisateur' })
  role: string;

  @Column({ type: 'varchar', name: 'avatar', nullable: true })
  avatar: Buffer | File

  @UpdateDateColumn()
  updated: Date;

  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  constructor(copy: Partial<User> = {}) {
    this.articles = getCopyConstructions(Article, copy.articles) as any
    this.password = getOrDefault(copy.password, undefined)
    this.email = getOrDefault(copy.email, undefined) as any
    this.userId = getOrDefault(copy.userId, undefined) as any
    this.lastName = getOrDefault(copy.lastName, undefined)
    this.mobilePhone = getOrDefault(copy.mobilePhone, undefined)
    this.comments = getCopyConstructions(Comment, copy.comments) as any
    this.role = getOrDefault(copy.role, undefined)
    this.avatar = getOrDefault(copy.avatar, undefined)
    this.firstName = getOrDefault(copy.firstName, undefined)
  }
}
