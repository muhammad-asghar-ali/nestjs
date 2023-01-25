import { Injectable } from '@nestjs/common';
import { CreateUserType } from '../dto/types';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'test', email: 'test' },
    { username: 'test', email: 'test' },
    { username: 'test', email: 'test' },
  ];
  /**
   *
   * @returns all users
   */
  fetchUser() {
    return this.fakeUsers;
  }

  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
    return;
  }

  getUserById(id: number) {
    return { id: 1, username: 'test', email: 'test' };
  }
}
