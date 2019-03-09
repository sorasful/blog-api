import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import {ApiUseTags, ApiResponse} from '@nestjs/swagger';
import { ArticlePostInDTO } from './article.dto';

@ApiUseTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get(':id')
  @ApiResponse({status : HttpStatus.OK, description:'Article found and retrieved'} )
  @ApiResponse({status : HttpStatus.NOT_FOUND, description:'Article not found'})
  async getById(@Param('id') id: string) {
    return this.articleService.getById(id);
  }

  @Post()
  @ApiResponse({status : HttpStatus.CREATED, description:'Article created'} )
  @ApiResponse({status : HttpStatus.BAD_REQUEST, description:'Error in data send to create article'})
  async create(@Body() article: ArticlePostInDTO) {
    console.log(article);
    return this.articleService.create(article);
  }
}
