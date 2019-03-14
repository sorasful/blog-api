import { Inject, Injectable, Optional } from '@nestjs/common';
import { Repository } from "typeorm";
import { UserService } from '../user/user.service'
import { ArticlePostInDTO, ArticleUpdateInDTO } from "./article.dto";
import { ArticleRepository } from "./article.repository";
import { Article } from "./entity/article.entity";
import { UserUpdateInDTO } from '../user/user.dto';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(ArticleRepository)
    private readonly articleRepository: ArticleRepository,

    @Optional()
    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  /**
   * Insert a article identified
   *
   * @returns Resolves with Article
   */
  async create(article: Partial<Article>) {
    return this.articleRepository.insert(article);
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

  /**
   * Returns a article identified by its title
   *
   * @param id - article id
   * @returns Resolves with Article
   */
  async getByTitle(nameArticle: string) {
    return this.articleRepository.findOne({ where: { title: nameArticle }});
  }

  async findAll() {
    const take = 10;
    const skip = 0;
    const result = await this.articleRepository.find({ take: take, skip: skip })

    return result
  }

   /**
   * Update a article
   *
   */
  async update(article: ArticleUpdateInDTO) {
    let article_to_update = await this.getById(article.id);
    article_to_update.content = article.content;
    article_to_update.title = article.title;

    return this.articleRepository.save(article_to_update);
  }


  /*
  * Delete a article
   */
    async deleteById(id: string) {
    return this.articleRepository.delete(id);
  }


}
