import { Body, Injectable, NotFoundException } from '@nestjs/common';
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
    //Find author from the database based on the authorId
    const author = await this.usersService.findOneById(createPostDto.authorId);

    if (!author) {
      throw new NotFoundException(
        `Author with id ${createPostDto.authorId} not found`,
      );
    }

    const post = this.postRepository.create({
      ...createPostDto,
      author: author,
    });

    return await this.postRepository.save(post);
  }

  public async findAll(userId: string) {
    let posts = await this.postRepository.find({
      relations: {
        metaOptions: true,
        // author: true,
      },
    });
    return posts;
  }

  public async deletePost(id: number) {
    //Delete the post
    await this.postRepository.delete(id);
    //Confirmation
    return { deleted: true, id };
  }
}
