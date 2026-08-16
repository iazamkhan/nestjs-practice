import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Class to connect to Users table and connect to business operations
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting Users Repository
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDTO: CreateUserDto) {
    //Check if the user exists with the same email
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDTO.email },
    });
    //Handle exception
    //Create a new user
    let newUser = this.usersRepository.create(createUserDTO);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  /**
   * The method to get all the users from the database
   */

  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
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
  /**
   * Find a single user by the id of a user
   */
  public findOneById(id: string) {
    return {
      firstName: 'John',
      email: 'john@gmail.com',
      id: '12345',
    };
  }
}
