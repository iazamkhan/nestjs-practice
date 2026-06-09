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
} from '@nestjs/common';

//http://localhost:3000

@Controller('users')
export class UsersController {
  @Get('/:id/')
  public getUsers(@Param('id') id: any, @Query() query: any) {
    console.log(id);
    console.log(query);

    return 'You sent a get request to users endpoint';
  }

  @Post()
  public createUsers(@Body() body: any) {
    console.log(body);
    return 'You sent a post request to users endpoint';
  }
}
