import {
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SortDto {
  @IsOptional()
  key: string;

  @IsOptional()
  @IsIn(['asc', 'desc', 'ASC', 'DESC'])
  direction: 'asc' | 'desc' | 'ASC' | 'DESC';
}

export class PaginatedRequestDto {
  @IsNumber()
  @Type(() => Number)
  page = 1;

  @IsNumber()
  @Type(() => Number)
  size = 10;

  @IsOptional()
  search?: string;

  @IsOptional()
  filter?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SortDto)
  sortBy?: SortDto[];
}

export class PaginatedResponseDto<T> {
  pageSize: number;
  currentPage: number;
  numberOfPages: number;
  numberOfItems: number;
  sortBy: SortDto[];
  items: T[];
}
