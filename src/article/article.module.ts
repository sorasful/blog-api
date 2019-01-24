import { Module } from '@nestjs/common';

import { customRepository } from '../utils/custom-repository.tools';
import { DatabaseModule } from '../utils/database/database.module';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [ArticleController],
  providers: [ArticleService, customRepository(ArticleRepository)],
})
export class ArticleModule {}
