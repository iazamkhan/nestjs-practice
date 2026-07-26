import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  Headers,
  Ip,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

//http://localhost:3000

@Controller('users')
export class UsersController {
  constructor(
    //Injecting users service
    private readonly usersService: UsersService,
  ) {}
  @Get('/{:id}/')
  public getUsers(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', ParseIntPipe, new DefaultValuePipe(10)) limit: number,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
  ) {
    return this.usersService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  public createUsers(
    @Body() createUserDto: CreateUserDto,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log(createUserDto instanceof CreateUserDto);
    console.log(headers);
    console.log(ip);
    return 'You sent a post request to users endpoint';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
