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
    const savedMaterial = await this.materialRepository.save(material);
    return this.toDto(savedMaterial);
  }

  async paginatedSearch(
    query: PaginatedRequestDto,
  ): Promise<PaginatedMaterialResponseDto> {
    return super.paginate(query, ['category']);
  }

  async findOne(id: number): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
    return material;
  }

  async update(
    id: number,
    updateMaterialDto: UpdateMaterialDto,
  ): Promise<MaterialResponseDto> {
    const material = await this.materialRepository.preload({
      id,
      ...updateMaterialDto,
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

    await this.materialRepository.save(material);
    return this.toDto(material);
  }

  async remove(id: number): Promise<void> {
    const material = await this.findOne(id);
    material.isDeleted = true;
    material.isActive = false;
    await this.materialRepository.save(material);
  }
}
