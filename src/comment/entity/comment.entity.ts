import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {

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
