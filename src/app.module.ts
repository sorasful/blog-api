import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { ArticleModule } from './article/article.module';
import { ArticleController } from './article/article.controller';
import { UserController } from './user/user.controller';
import { CommentController } from './comment/comment.controller';

@Module({
  imports: [UserModule, CommentModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
