import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/database/entities/category.entity';
import {
  CategoryResponseDto,
  CreateCategoryDto,
  PaginatedCategoryResponseDto,
  UpdateCategoryDto,
} from 'src/core/dtos/category.dto';
import { BaseService } from '../base.service';
import { PaginatedRequestDto } from 'src/core/dtos/pagination.dto';

@Injectable()
export class CategoryService extends BaseService<
  Category,
  CategoryResponseDto
> {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository, CategoryResponseDto, ['categoryName']);
  }

  async create(dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const existingByName = await this.categoryRepository.findOne({
      where: { categoryName: dto.categoryName },
    });
    if (existingByName) {
      throw new ConflictException('Brand with this name already exists');
    }

    const category = new Category();
    category.categoryName = dto.categoryName;
    category.description = dto.description;
    if (dto.parentCategoryId) {
      category.parentCategory = await this.categoryRepository.findOne({
        where: { id: dto.parentCategoryId },
      });
    }

    await this.categoryRepository.save(category);
    return this.toDto(category);
  }

  async paginatedSearch(
    query: PaginatedRequestDto,
  ): Promise<PaginatedCategoryResponseDto> {
    return super.paginate(query, ['parentCategory', 'children']);
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parentCategory', 'children'],
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (updateCategoryDto.parentCategoryId !== undefined) {
      category.parentCategory = updateCategoryDto.parentCategoryId
        ? await this.categoryRepository.findOne({
            where: { id: updateCategoryDto.parentCategoryId },
          })
        : null;
    }

    await this.categoryRepository.save(category);
    return this.toDto(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    category.isDeleted = true;
    category.isActive = false;
    await this.categoryRepository.save(category);
  }
}
