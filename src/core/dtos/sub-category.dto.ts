import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { PaginatedResponseDto } from './pagination.dto';

export class CreateSubCategoryDto {
  @ApiProperty({
    example: 'Furniture',
    description: 'Category name',
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  subCategoryName: string;

  @ApiProperty({
    example: 'Description',
    description: 'Category Description',
    minLength: 3,
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  description: string;

  @ApiProperty({
    example: false,
    description: 'Category active status',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: 1,
    description: 'Parent category ID',
    required: false,
  })
  @IsOptional()
  parentCategoryId?: number;
}

export class UpdateSubCategoryDto {
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
  subCategoryName?: string;

  @ApiProperty({
    example: 'Description',
    description: 'Category Description',
    minLength: 3,
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'Parent category ID',
    required: false,
  })
  @IsOptional()
  parentCategoryId?: number;

  @ApiProperty({
    example: false,
    description: 'Brand active status',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class SubCategoryResponseDto {
  @ApiProperty({ example: 1, description: 'Category ID' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Furniture', description: 'Category name' })
  @Expose()
  @Transform(({ obj }) => obj.categoryName)
  subCategoryName: string;

  @ApiProperty({ example: 'Description', description: 'Category Description' })
  @Expose()
  description: string;

  @ApiProperty({
    example: 1,
    description: 'Parent category ID',
    nullable: true,
  })
  @Transform(({ obj }) => obj.parentCategory?.id || null)
  parentCategoryId?: number | null;

  @ApiProperty({ example: true, description: 'Category active status' })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    example: '2025-02-18T12:00:00.000Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-02-18T12:30:00.000Z',
    description: 'Last update timestamp',
  })
  updatedAt: Date;
}

export class PaginatedSubCategoryResponseDto extends PaginatedResponseDto<SubCategoryResponseDto> {}
