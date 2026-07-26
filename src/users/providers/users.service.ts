import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    //Injecting auth service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      {
        firstName: 'John',
        email: 'john@gmail.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@gmail.com',
      },
    ];
  }
  //Find one by id
  public findOneById(id: string) {
    return {
      firstName: 'John',
      email: 'john@gmail.com',
      id: '12345',
    };
  }
}
