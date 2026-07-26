import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public login(email: string, password: string, id: string) {
    // Check if the user exists in the DB or not
    //login
    //return a token to identify
  }
}
