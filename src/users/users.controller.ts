import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  /**
   * some examples for get api
   */
  @Get()
  getUsers() {
    return [{ id: 1, user: 'test' }];
  }

  @Get('posts')
  getUserPosts() {
    return [{ id: 1, user: 'test', posts: [{ id: 1, title: 'post' }] }];
  }

  @Get()
  getPostComments() {
    return [{ id: 1, title: 'post', comments: [{ id: 1, description: 'test' }] }];
  }

  /**
   * example for post api
   */
  @Post()
  createUsers(@Req() request: Request, @Res() response: Response) {
    console.log(request.body);
    response.send('created');
  }

  @Post('create')
  createUser(@Body() userDto: CreateUserDto) {
    console.log(userDto);
    return {};
  }

  /**
   * params examples
   * nested params examples
   */
  @Get(':id')
  getUserById(@Req() request: Request, @Res() response: Response) {
    console.log(request.params);
    const id = request.params;
    response.json({ id });
  }

  @Get(':id')
  getUsersById(@Param('id') id: string) {
    console.log(id);
    return { id };
  }

  @Get(':id/:postId')
  getUserPostById(@Param('id') id: string, @Param('postId') postId: string) {
    console.log(id, postId);
    return { id, postId };
  }
}
