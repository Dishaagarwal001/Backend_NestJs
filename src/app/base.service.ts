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
    const { page, size, search, filter, sortBy } = query;

    const isPaginated = page !== undefined && size !== undefined;
    const skip = isPaginated ? (page - 1) * size : 0;
    const take = isPaginated ? size : undefined;

    let where: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity> = [];

    const defaultFilter: FindOptionsWhere<Entity> = { isDeleted: false } as any;

    if (search && this.searchFields.length > 0) {
      where = this.searchFields.map((field) => ({
        [field]: ILike(`%${search}%`),
        ...defaultFilter,
      })) as FindOptionsWhere<Entity>[];
    }

    if (filter) {
      if (!('isActive' in filter)) {
        filter.isActive = true;
      }

      if (Array.isArray(where) && where.length > 0) {
        where = where.map((condition) => ({ ...condition, ...filter }));
      } else {
        where = { ...defaultFilter, ...filter };
      }
    } else {
      where = defaultFilter;
    }

    if (Array.isArray(where) && where.length === 0) {
      where = defaultFilter;
    }

    const findOptions: FindManyOptions<Entity> = {
      skip,
      take,
      where,
      relations,
      order: sortBy?.reduce((acc, sort) => {
        acc[sort.key] = sort.direction.toUpperCase();
        return acc;
      }, {}),
    };

    const [items, total] = await this.repository.findAndCount(findOptions);

    return {
      currentPage: isPaginated ? page : 1,
      pageSize: isPaginated ? size : total,
      totalPages: isPaginated ? Math.ceil(total / size) : 1,
      totalItems: total,
      sortBy: sortBy || null,
      items: this.toDtos(items),
    };
  }
}
