import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("middleware")
    console.log(req.headers.authorization)

    const token = req.headers.authorization

    if(!token) throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED) 
    next();
  }
}
