import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {
  constructor(
    /**
     * Inject MetaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(createMetaOptionsDTO: CreatePostMetaOptionsDto) {
    let metaOption = this.metaOptionsRepository.create(createMetaOptionsDTO);
    return await this.metaOptionsRepository.save(metaOption);
  }
}
