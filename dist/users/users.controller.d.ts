import { Request, Response } from 'express';
import { CreateUserDto } from './dto/createUser.dto';
export declare class UsersController {
    getUsers(): {
        id: number;
        user: string;
    }[];
    getUserPosts(): {
        id: number;
        user: string;
        posts: {
            id: number;
            title: string;
        }[];
    }[];
    getPostComments(): {
        id: number;
        title: string;
        comments: {
            id: number;
            description: string;
        }[];
    }[];
    createUsers(request: Request, response: Response): void;
    createUser(userDto: CreateUserDto): {};
    getUserById(request: Request, response: Response): void;
    getUsersById(id: string): {
        id: string;
    };
    getUserPostById(id: string, postId: string): {
        id: string;
        postId: string;
    };
}
