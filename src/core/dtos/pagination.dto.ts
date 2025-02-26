import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SortDto {
  @ApiPropertyOptional({
    example: 'createdAt',
    description: 'Field to sort by',
    required: false,
  })
  @IsOptional()
  key: string;

  @ApiPropertyOptional({
    enum: ['asc', 'desc', 'ASC', 'DESC'],
    example: 'desc',
    description: 'Sort direction',
    required: false,
  })
  @IsOptional()
  @IsIn(['asc', 'desc', 'ASC', 'DESC'])
  direction: 'asc' | 'desc' | 'ASC' | 'DESC';
}

export class PaginatedRequestDto {
  @ApiProperty({
    example: 1,
    description: 'Page number',
    default: 1,
  })
  @IsNumber()
  @Type(() => Number)
  page = 1;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
    default: 10,
  })
  @IsNumber()
  @Type(() => Number)
  size = 10;

  @ApiPropertyOptional({
    example: 'search term',
    description: 'Search keyword',
  })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    example: { isActive: true },
    description: 'Filter criteria as key-value pairs',
  })
  @IsOptional()
  filter?: Record<string, any>;

  @ApiPropertyOptional({
    type: [SortDto],
    description: 'Array of sorting criteria',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SortDto)
  sortBy?: SortDto[];
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ example: 10, description: 'Number of items per page' })
  pageSize: number;

  @ApiProperty({ example: 1, description: 'Current page number' })
  currentPage: number;

  @ApiProperty({ example: 5, description: 'Total number of pages' })
  totalPages: number;

  @ApiProperty({ example: 50, description: 'Total number of items' })
  totalItems: number;

  @ApiProperty({
    type: [SortDto],
    example: [{ key: 'createdAt', direction: 'desc' }],
    description: 'Sorting criteria used',
  })
  sortBy: SortDto[];

  @ApiProperty({
    description: 'Array of result items',
    type: 'array',
    items: { type: 'object' },
  })
  items: T[];
}
