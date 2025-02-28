import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Category } from 'src/database/entities/category.entity';
import { BaseService } from '../base.service';
import { PaginatedRequestDto } from 'src/core/dtos/pagination.dto';
import {
  CreateSubCategoryDto,
  PaginatedSubCategoryResponseDto,
  SubCategoryResponseDto,
  UpdateSubCategoryDto,
} from 'src/core/dtos/sub-category.dto';

@Injectable()
export class SubCategoryService extends BaseService<
  Category,
  SubCategoryResponseDto
> {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository, SubCategoryResponseDto, ['categoryName']);
  }

  async create(dto: CreateSubCategoryDto): Promise<SubCategoryResponseDto> {
    const existingByName = await this.categoryRepository.findOne({
      where: { categoryName: dto.subCategoryName },
    });
    if (existingByName) {
      throw new ConflictException('Brand with this name already exists');
    }

    const category = new Category();
    category.categoryName = dto.subCategoryName;
    category.description = dto.description;
    if (dto.parentCategoryId) {
      category.parentCategory = await this.categoryRepository.findOne({
        where: { id: dto.parentCategoryId },
      });
    }

    const newCategory = await this.categoryRepository.save(category);
    return this.toDto(newCategory);
  }

  async paginatedSearch(
    query: PaginatedRequestDto,
    id: number,
  ): Promise<PaginatedSubCategoryResponseDto> {
    if (!query.filter) {
      query.filter = {};
    }
    if (id) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!parentCategory) {
        return {
          currentPage: query.page || 1,
          pageSize: query.size || 10,
          totalPages: 0,
          totalItems: 0,
          sortBy: query.sortBy || null,
          items: [],
        };
      }
      query.filter.parentCategory = { id };
    } else {
      query.filter.parentCategory = IsNull();
    }
    return super.paginate(query, ['parentCategory', 'children']);
  }

  async findOne(id: number): Promise<Category> {
    const subCategory = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parentCategory', 'children'],
    });
    if (!subCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return subCategory;
  }

  async update(
    id: number,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ): Promise<SubCategoryResponseDto> {
    const category = await this.categoryRepository.preload({
      id,
      ...updateSubCategoryDto,
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (updateSubCategoryDto.parentCategoryId !== undefined) {
      category.parentCategory = updateSubCategoryDto.parentCategoryId
        ? await this.categoryRepository.findOne({
            where: { id: updateSubCategoryDto.parentCategoryId },
          })
        : null;
    }

    const updatedSubCategory = await this.categoryRepository.save(category);
    return this.toDto(updatedSubCategory);
  }

  async remove(id: number): Promise<void> {
    const subCategory = await this.findOne(id);
    subCategory.isDeleted = true;
    subCategory.isActive = false;
    await this.categoryRepository.save(subCategory);
  }
}
