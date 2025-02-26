import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from 'src/database/entities/material.entity';
import { Category } from 'src/database/entities/category.entity';
import {
  CreateMaterialDto,
  UpdateMaterialDto,
  MaterialResponseDto,
  PaginatedMaterialResponseDto,
} from 'src/core/dtos/material.dto';
import { plainToInstance } from 'class-transformer';
import { BaseService } from '../base.service';
import { PaginatedRequestDto } from 'src/core/dtos/pagination.dto';

@Injectable()
export class MaterialService extends BaseService<
  Material,
  MaterialResponseDto
> {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(materialRepository, MaterialResponseDto, ['materialName']);
  }

  async create(
    createMaterialDto: CreateMaterialDto,
  ): Promise<MaterialResponseDto> {
    const category = await this.categoryRepository.findOne({
      where: { id: createMaterialDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createMaterialDto.categoryId} not found`,
      );
    }

    const material = this.materialRepository.create({
      ...createMaterialDto,
      category,
    });
    await this.materialRepository.save(material);
    return plainToInstance(MaterialResponseDto, material, {
      excludeExtraneousValues: true,
    });
  }

  async paginatedSearch(
    query: PaginatedRequestDto,
  ): Promise<PaginatedMaterialResponseDto> {
    return super.paginate(query, ['category']);
  }

  async findOne(id: number): Promise<MaterialResponseDto> {
    const material = await this.materialRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
    return plainToInstance(MaterialResponseDto, material, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    updateMaterialDto: UpdateMaterialDto,
  ): Promise<MaterialResponseDto> {
    const material = await this.materialRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }

    if (updateMaterialDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateMaterialDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateMaterialDto.categoryId} not found`,
        );
      }
      material.category = category;
    }

    Object.assign(material, updateMaterialDto);
    await this.materialRepository.save(material);
    return plainToInstance(MaterialResponseDto, material, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.materialRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
  }
}
