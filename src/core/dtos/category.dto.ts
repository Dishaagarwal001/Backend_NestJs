import { IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginatedResponseDto } from './pagination.dto';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Furniture',
    description: 'Category name',
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  categoryName: string;

  @ApiProperty({
    example: 1,
    description: 'Parent category ID',
    required: false,
  })
  @IsOptional()
  parentCategoryId?: number;
}

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Office Chairs',
    description: 'Category name',
    minLength: 2,
    maxLength: 30,
    required: false,
  })
  @IsString()
  @Length(2, 30)
  @IsOptional()
  categoryName?: string;

  @ApiProperty({
    example: 1,
    description: 'Parent category ID',
    required: false,
  })
  @IsOptional()
  parentCategoryId?: number;
}

export class CategoryResponseDto {
  @ApiProperty({ example: 1, description: 'Category ID' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Furniture', description: 'Category name' })
  @Expose()
  categoryName: string;

  @ApiProperty({
    example: 1,
    description: 'Parent category ID',
    nullable: true,
  })
  @Expose()
  parentCategoryId?: number;

  @ApiProperty({
    example: '2025-02-18T12:00:00.000Z',
    description: 'Creation timestamp',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    example: '2025-02-18T12:30:00.000Z',
    description: 'Last update timestamp',
  })
  @Expose()
  updatedAt: Date;
}

export class PaginatedCategoryResponseDto extends PaginatedResponseDto<CategoryResponseDto> {}
