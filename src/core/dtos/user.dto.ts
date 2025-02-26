import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { PaginatedResponseDto } from './pagination.dto';

enum Gender {
  Male = 'm',
  Female = 'f',
  Unspecified = 'u',
}

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  lastName: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'Unique username',
    minLength: 3,
    maxLength: 15,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  userName: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '2000-05-15',
    description: 'Date of birth',
    required: false,
  })
  @IsOptional()
  dob?: Date;

  @ApiProperty({ example: 'Password123!', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain at least one letter, one number, and one special character',
  })
  password: string;

  @ApiProperty({
    example: 'm',
    description: 'Gender',
    enum: Gender,
    default: Gender.Unspecified,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @ApiProperty({
    example: true,
    description: 'Indicates if the user is active',
    default: true,
  })
  @IsOptional()
  isActive?: boolean;
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'Updated first name',
    minLength: 2,
    maxLength: 30,
    required: false,
  })
  @IsString()
  @Length(2, 30)
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Updated last name',
    minLength: 2,
    maxLength: 30,
    required: false,
  })
  @IsString()
  @Length(2, 30)
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Updated email',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'f',
    description: 'Updated gender',
    enum: Gender,
    required: false,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({
    example: false,
    description: 'Indicates if the user is deleted',
    required: false,
  })
  @IsOptional()
  isDeleted?: boolean;

  @ApiProperty({
    example: true,
    description: 'Indicates if the user is active',
    required: false,
  })
  @IsOptional()
  isActive?: boolean;
}

export class UserResponseDto {
  @ApiProperty({
    example: 'd6e5a16a-0f74-4c92-a3fd-2c4f83e6f3ab',
    description: 'Unique ID of the user',
  })
  @Expose()
  id: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @Expose()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @Expose()
  lastName: string;

  @ApiProperty({ example: 'johndoe', description: 'Username of the user' })
  @Expose()
  userName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the user',
  })
  @Expose()
  email: string;

  @ApiProperty({
    example: '2000-05-15',
    description: 'Date of birth of the user',
    required: false,
  })
  @Expose()
  dob?: Date;

  @ApiProperty({ example: 'm', description: 'Gender of the user' })
  @Expose()
  gender: Gender;

  @ApiProperty({
    example: true,
    description: 'Indicates if the user is active',
  })
  @Expose()
  isActive: boolean;

  @ApiProperty({
    example: false,
    description: 'Indicates if the user is deleted',
  })
  @Expose()
  isDeleted: boolean;

  @ApiProperty({
    example: '2025-02-18T12:00:00.000Z',
    description: 'User creation timestamp',
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

export class PaginatedUserResponseDto extends PaginatedResponseDto<UserResponseDto> {}
