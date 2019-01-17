import { Body, Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import {ApiUseTags, ApiResponse} from '@nestjs/swagger';

@ApiUseTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  @ApiResponse({status : HttpStatus.OK, description:'Comment found and retrieved'} )
  @ApiResponse({status : HttpStatus.NOT_FOUND, description:'Comment not found'})
  async getById(@Param('id') id: string) {
    return this.commentService.getById(id);
  }
}
