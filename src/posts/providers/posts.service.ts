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
    //Create post
    const post = this.postRepository.create(createPostDto);
    //Return the post
    return await this.postRepository.save(post);
  }

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    let posts = await this.postRepository.find();
    return posts;
  }

  public async deletePost(id: number) {
    //Find the post
    const post = await this.postRepository.findOneBy({ id });
    //Delete the post
    await this.postRepository.delete(id);
    //Delete the metaOptions if exists
    if (!post) {
      return { deleted: false, id, message: 'Post not found' };
    }
    if (post.metaOptions?.id) {
      await this.metaOptionsRepository.delete(post.metaOptions.id);
    }
    //Confirmation
    return { deleted: true, id };
  }
}
