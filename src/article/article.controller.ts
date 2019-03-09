import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import {ApiUseTags, ApiResponse} from '@nestjs/swagger';
import { ArticlePostInDTO, ArticleUpdateInDTO } from './article.dto';
import { UserUpdateInDTO } from '../user/user.dto';

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

  @Get()
  @ApiResponse({status : HttpStatus.OK, description:'Articles found and retrieved'} )
  @ApiResponse({status : HttpStatus.NOT_FOUND, description:'Articles not found'})
  async findAll() {
    return this.articleService.findAll();
  }

  @Post('update')
  @ApiResponse({status : HttpStatus.NO_CONTENT, description:'Article updated'} )
  @ApiResponse({status : HttpStatus.BAD_REQUEST, description:'Error in data send to update article'})
  async update(@Body() article: ArticleUpdateInDTO) {
    return this.articleService.update(article);
  }

  @Post()
  @ApiResponse({status : HttpStatus.CREATED, description:'Article created'} )
  @ApiResponse({status : HttpStatus.BAD_REQUEST, description:'Error in data send to create article'})
  async create(@Body() article: ArticlePostInDTO) {
    console.log(article);
    return this.articleService.create(article);
  }

  @Delete(':id')
  @ApiResponse({status : HttpStatus.NO_CONTENT, description:'Article found and retrieved'} )
  @ApiResponse({status : HttpStatus.NOT_FOUND, description:'Article not found'})
  async deleteById(@Param('id') id: string) {
    return this.articleService.deleteById(id);
  }



}
