import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(
    /*Injecting UsersService*/
    public readonly usersService: UsersService,
  ) {}
  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    return [
      {
        user: user,
        title: 'Test Title 1',
        content: 'Test Content',
      },
      {
        user: user,
        title: 'Test Title 2',
        content: 'Test Content',
      },
    ];
  }
}
