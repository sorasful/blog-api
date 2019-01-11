import { Body, Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { UserService } from './user.service';
import {ApiUseTags, ApiResponse} from '@nestjs/swagger';

@ApiUseTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiResponse({status : HttpStatus.OK, description:'User found and retrieved'} )
  @ApiResponse({status : HttpStatus.NOT_FOUND, description:'User not found'})
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }
}
