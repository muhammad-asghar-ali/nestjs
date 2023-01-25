import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { id: 1, user: 'test' },
    { id: 2, user: 'test' },
    { id: 3, user: 'test' },
  ];
  /**
   *
   * @returns all users
   */
  fetchUser() {
    return this.fakeUsers;
  }
}
