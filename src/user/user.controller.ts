import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {ApiUseTags, ApiResponse} from '@nestjs/swagger';
import { UserPostInDTO, UserUpdateInDTO } from '../user/user.dto';


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

  @Post()
  @ApiResponse({status : HttpStatus.CREATED, description:'User created'} )
  @ApiResponse({status : HttpStatus.BAD_REQUEST, description:'Error in data send to create user'})
  async create(@Body() user: UserPostInDTO) {
    return this.userService.create(user);
  }

   @Post('update')
  @ApiResponse({status : HttpStatus.NO_CONTENT, description:'User updated'} )
  @ApiResponse({status : HttpStatus.BAD_REQUEST, description:'Error in data send to update user'})
  async update(@Body() user: UserUpdateInDTO) {
    return this.userService.update(user);
  }


}
