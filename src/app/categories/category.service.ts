import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/database/entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/core/dtos/category.dto';
// import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    category.categoryName = dto.categoryName;

    if (dto.parentCategoryId) {
      category.parentCategory = await this.categoryRepository.findOne({
        where: { id: dto.parentCategoryId },
      });
    }

    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['parentCategory', 'children'],
    });
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

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);

    if (dto.categoryName) {
      category.categoryName = dto.categoryName;
    }

    if (dto.parentCategoryId !== undefined) {
      category.parentCategory = dto.parentCategoryId
        ? await this.categoryRepository.findOne({
            where: { id: dto.parentCategoryId },
          })
        : null;
    }

    return await this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
