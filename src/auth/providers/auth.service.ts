import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    //injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public login(email: string, password: string, id: string) {
    // Check if the user exists in the DB or not
    //login
    //return a token to identify
    const user = this.usersService.findOneById('12345');
    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}
