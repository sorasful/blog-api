import { Body, Controller, Get, Delete, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import {ApiUseTags, ApiResponse} from '@nestjs/swagger';
import { UserPostInDTO, UserUpdateInDTO, UserUpdateRoleInDTO } from '../user/user.dto';
import { User } from './entity/user.entity';


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

  @Delete(':id')
  @ApiResponse({status : HttpStatus.NO_CONTENT, description:'User found and retrieved'} )
  @ApiResponse({status : HttpStatus.NOT_FOUND, description:'User not found'})
  async deleteById(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }


  @Post('create')
  @ApiResponse({status : HttpStatus.CREATED, description:'User created'} )
  @ApiResponse({status : HttpStatus.BAD_REQUEST, description:'Error in data send to create user'})
  async create(@Body() user: UserPostInDTO) {
    return this.userService.create(user);
  }

  @Put('update')
  @ApiResponse({status : HttpStatus.NO_CONTENT, description:'User updated'} )
  @ApiResponse({status : HttpStatus.BAD_REQUEST, description:'Error in data send to update user'})
  async update(@Body() userDto: UserUpdateInDTO) {
    return this.userService.update(new User({
      email: userDto.email,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      mobilePhone: userDto.mobilePhone,
      userId: userDto.id,
      avatar: userDto.avatar ? Buffer.from(userDto.avatar) : undefined
    }));
  }

  @Put('updateRole')
  @ApiResponse({status : HttpStatus.NO_CONTENT, description:'User updated'} )
  @ApiResponse({status : HttpStatus.BAD_REQUEST, description:'Error in data send to update user'})
  async updateRole(@Body() userDto: UserUpdateRoleInDTO) {
    return this.userService.updateRoleUser(userDto.userId, userDto.newRole);
  }
}
