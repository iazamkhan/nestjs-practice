import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @ApiProperty({
    description: "For example: 'my-url'",
    example: 'my-blog-post',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example: "my-url',
  })
  @MaxLength(256)
  slug: string;

  @ApiPropertyOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;
}
