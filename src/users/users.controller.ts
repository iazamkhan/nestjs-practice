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

//http://localhost:3000

@Controller('users')
export class UsersController {
  @Get('/:id/')
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit', ParseIntPipe, new DefaultValuePipe(10)) limit: number,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
  ) {
    console.log(id);
    console.log(typeof id);
    console.log(limit, typeof limit);
    console.log(page, typeof page);

    return 'You sent a get request to users endpoint';
  }

  @Post()
  public createUsers(
    @Body() body: any,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log(body);
    console.log(headers);
    console.log(ip);
    return 'You sent a post request to users endpoint';
  }
}
