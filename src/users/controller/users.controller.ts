import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../dto/createUser.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UsersClassPipe } from '../pipes/users.pipe';
import { UsersService } from '../service/users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}
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
   * call the users service
   */
  @Get('service')
  getUsersFromService() {
    return this.usersService.fetchUser();
  }

  // use custome create pipe
  @Post('service')
  @UsePipes(new ValidationPipe())
  createUserFromService(@Body(UsersClassPipe) userDto: CreateUserDto) {
    console.log(userDto);
    console.log(userDto.age.toFixed())
    return this.usersService.createUser(userDto)
  }

  @Get('service/:id')
  getUsersByIdFromService(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    const user = this.usersService.getUserById(id);
    if(!user) throw new HttpException('user not found', HttpStatus.BAD_REQUEST);

    return user;
  }

  /**
   * example for post api
   * add validation to get requests
   */
  @Post()
  createUsers(@Req() request: Request, @Res() response: Response) {
    console.log(request.body);
    response.send('created');
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() userDto: CreateUserDto) {
    console.log(userDto);
    return {};
  }

  /**
   * params examples
   * nested params examples
   * add validation to get requests
   */
  @Get(':id')
  getUserById(@Req() request: Request, @Res() response: Response) {
    console.log(request.params);
    const id = request.params;
    response.json({ id });
  }

  @Get('profile/:id')
  getUsersById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return { id };
  }

  @Get(':id/:postId')
  getUserPostById(@Param('id', ParseIntPipe) id: number, @Param('postId', ParseIntPipe) postId: number) {
    console.log(id, postId);
    return { id, postId };
  }

  /**
   * query examples
   * nested params examples
   */
  @Get('query')
  getUserByQuery(@Query('sortBy') sortBy: string) {
    console.log(sortBy);
    return [{ id: 1, user: 'test' }];
  }

  @Get('validate')
  getUserByQueryWithValidation(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
    console.log(sortDesc);
    return [{ id: 1, user: 'test' }];
  }
}
