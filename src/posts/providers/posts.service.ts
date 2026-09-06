import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

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

    /**
     * Inject TagsService
     */
    private readonly tagsService: TagsService,
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

    const tags = await this.tagsService.findMultipleTags(
      createPostDto.tags ?? [],
    );

    const post = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    return await this.postRepository.save(post);
  }

  public async findAll(userId: string) {
    let posts = await this.postRepository.find({
      relations: {
        metaOptions: true,
        // tags: true
        // author: true,
      },
    });
    return posts;
  }

  public async update(patchPostDto: PatchPostDto) {
    //Find the tags
    const tags = await this.tagsService.findMultipleTags(
      patchPostDto.tags ?? [],
    );

    //Find the post
    const post = await this.postRepository.findOneBy({ id: patchPostDto.id });

    if (!post) {
      throw new NotFoundException(`Post with id ${patchPostDto.id} not found`);
    }

    //Update the properties
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    //Assign the new tags
    post.tags = tags;

    //Save the post and return
    return await this.postRepository.save(post);
  }

  public async deletePost(id: number) {
    //Delete the post
    await this.postRepository.delete(id);
    //Confirmation
    return { deleted: true, id };
  }
}
