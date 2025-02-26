import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PaginatedResponseDto } from './pagination.dto';

export class CreateBrandDto {
  @ApiProperty({
    example: 'Nike',
    description: 'Brand name',
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  brandName: string;

  @ApiProperty({
    example: 'NIKE01',
    description: 'Brand code',
    minLength: 2,
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  brandCode: string;

  @ApiProperty({ example: true, description: 'Brand active status' })
  @IsBoolean()
  isActive: boolean;
}

export class UpdateBrandDto {
  @ApiProperty({
    example: 'Adidas',
    description: 'Brand name',
    minLength: 2,
    maxLength: 30,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(2, 30)
  brandName?: string;

  @ApiProperty({
    example: 'ADD01',
    description: 'Brand code',
    minLength: 2,
    maxLength: 10,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(2, 10)
  brandCode?: string;

  @ApiProperty({
    example: false,
    description: 'Brand active status',
    required: false,
  })
  @IsBoolean()
  isActive?: boolean;
}

export class BrandResponseDto {
  @ApiProperty({ example: 1, description: 'Brand ID' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Nike', description: 'Brand name' })
  @Expose()
  brandName: string;

  @ApiProperty({ example: 'NIKE01', description: 'Brand code' })
  @Expose()
  brandCode: string;

  @ApiProperty({ example: true, description: 'Brand active status' })
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

export class PaginatedBrandResponseDto extends PaginatedResponseDto<BrandResponseDto> {}
