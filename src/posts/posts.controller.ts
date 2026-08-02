import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    /*Injecting posts service*/
    private readonly postsService: PostsService,
  ) {}

  //GET localhost://3000/users/:userId
  @Get('/{:userId}/')
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @Post()
  public createPost(@Body() createPostDTO: CreatePostDto) {
    console.log(createPostDTO);
  }
}
