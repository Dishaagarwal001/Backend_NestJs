import { Injectable } from '@nestjs/common';
import { Repository, FindManyOptions, ILike, FindOptionsWhere } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import {
  PaginatedRequestDto,
  PaginatedResponseDto,
} from 'src/core/dtos/pagination.dto';

@Injectable()
export abstract class BaseService<Entity, ResponseDto> {
  constructor(
    protected readonly repository: Repository<Entity>,
    protected readonly responseDto: new (...args: any[]) => ResponseDto,
    protected readonly searchFields: string[] = [],
  ) {}

  protected toDto(entity: Entity): ResponseDto {
    return plainToInstance(this.responseDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  protected toDtos(entities: Entity[]): ResponseDto[] {
    return plainToInstance(this.responseDto, entities, {
      excludeExtraneousValues: true,
    });
  }

  async paginate(
    query: PaginatedRequestDto,
    relations: string[] = [],
  ): Promise<PaginatedResponseDto<ResponseDto>> {
    const { page = 1, size = 10, search, filter, sortBy } = query;
    const skip = (page - 1) * size;

    let where: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity> = [];

    if (search && this.searchFields.length > 0) {
      where = this.searchFields.map((field) => ({
        [field]: ILike(`%${search}%`),
      })) as FindOptionsWhere<Entity>[];
    }

    if (filter) {
      if (Array.isArray(where) && where.length > 0) {
        where = where.map((condition) => ({ ...condition, ...filter }));
      } else {
        where = filter;
      }
    }

    if (Array.isArray(where) && where.length === 0) {
      where = {};
    }

    const findOptions: FindManyOptions<Entity> = {
      skip,
      take: size,
      where,
      relations,
      order: sortBy?.reduce((acc, sort) => {
        acc[sort.key] = sort.direction.toUpperCase();
        return acc;
      }, {}),
    };

    const [items, total] = await this.repository.findAndCount(findOptions);

    return {
      pageSize: size,
      currentPage: page,
      numberOfPages: Math.ceil(total / size),
      numberOfItems: total,
      sortBy: sortBy || null,
      items: this.toDtos(items),
    };
  }
}
