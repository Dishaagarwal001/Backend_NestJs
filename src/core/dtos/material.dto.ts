import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateMaterialDto {
  @ApiProperty({
    example: 'Wood',
    description: 'Material name',
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  materialName: string;

  @ApiProperty({ example: 'MAT001', description: 'Unique material code' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  materialCode: string;

  @ApiProperty({ example: 1, description: 'Category ID of the material' })
  @IsNotEmpty()
  categoryId: number;
}

export class UpdateMaterialDto {
  @ApiProperty({
    example: 'Steel',
    description: 'Material name',
    minLength: 2,
    maxLength: 30,
    required: false,
  })
  @IsString()
  @Length(2, 30)
  materialName?: string;

  @ApiProperty({
    example: 'MAT002',
    description: 'Unique material code',
    required: false,
  })
  @IsString()
  @Length(2, 10)
  materialCode?: string;

  @ApiProperty({
    example: 2,
    description: 'Updated category ID of the material',
    required: false,
  })
  categoryId?: number;
}

export class MaterialResponseDto {
  @ApiProperty({ example: 1, description: 'Material ID' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Wood', description: 'Material name' })
  @Expose()
  materialName: string;

  @ApiProperty({ example: 'MAT001', description: 'Unique material code' })
  @Expose()
  materialCode: string;

  @ApiProperty({ example: 1, description: 'Category ID of the material' })
  @Expose()
  categoryId: number;

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
