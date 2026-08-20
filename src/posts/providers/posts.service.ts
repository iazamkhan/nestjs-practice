import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    /*Injecting UsersService*/
    public readonly usersService: UsersService,
    /**
     * Inject postRepository
     */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    /**
     * Inject metaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * Creating new posts
   */
  public async create(@Body() createPostDto: CreatePostDto) {
    //Create metaOptions
    const metaOptions = createPostDto.metaOptions
      ? this.metaOptionsRepository.create(createPostDto.metaOptions)
      : null;

    if (metaOptions) {
      await this.metaOptionsRepository.save(metaOptions);
    }
    //Create post
    const post = this.postRepository.create(createPostDto);
    //Add metaoptions to the post
    if (metaOptions) {
      post.metaOptions = metaOptions;
    }
    //Return the post
    return await this.postRepository.save(post);
  }

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
