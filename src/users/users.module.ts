import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ExampleMiddleware } from './middlewares/example.middleware';
import { UsersMiddleware } from './middlewares/users.middleware';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  /**
   * add middleware in user modules
   * we can pass routes or constroller both
   * wo also pass specific request by using path and method keywords 
   * we can also pass an array of routes
   * also we can use multiple middlewares
   * @param consumer 
   */
  configure(consumer: MiddlewareConsumer) {
      // consumer.apply(UsersMiddleware).forRoutes('users');
      // consumer.apply(UsersMiddleware).forRoutes(UsersController); 
      // consumer.apply(UsersMiddleware).forRoutes({
      //   path: 'users',
      //   method: RequestMethod.GET
      // }); 

      // multiple middlewares
      consumer.apply(UsersMiddleware).forRoutes(UsersController).apply(ExampleMiddleware).forRoutes(UsersController)
  }
}
