import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserService } from '../user/user.service'
import { ArticlePostInDTO } from "./article.dto";
import { ArticleRepository } from "./article.repository";
import { Article } from "./entity/article.entity";

@Injectable()
export class ArticleService {
  constructor(
    @Inject(ArticleRepository)
    private readonly articleRepository: ArticleRepository,

    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  /**
   * Insert a article identified
   *
   * @returns Resolves with Article
   */
  async create(article: ArticlePostInDTO) {
    let article_to_persist = new Article();
    article_to_persist.content = article.content;
    article_to_persist.title = article.title;
    article_to_persist.dislikes = article.dislikes;
    article_to_persist.likes = article.likes;
    article_to_persist.author = await this.userService.getById(article.author_id);

    return this.articleRepository.insert(article_to_persist);
  }

  /**
   * Returns a article identified by its id
   *
   * @param id - article id
   * @returns Resolves with Article
   */
  async getById(id: string) {
    return this.articleRepository.findOne(id);
  }

  async findAll() {
    const take = 10; // for pagination
    const skip = 0;

    const [result, total] = await this.articleRepository.findAndCount(
        {
            where: {},
            take: take,
            skip: skip
        }
    );

    return {
        data: result,
        count: total
    };
}

}
