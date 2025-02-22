import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from 'src/database/entities/brand.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
  BrandResponseDto,
} from 'src/core/dtos/brand.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<BrandResponseDto> {
    const brand = this.brandRepository.create(createBrandDto);
    await this.brandRepository.save(brand);
    return plainToInstance(BrandResponseDto, brand, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<BrandResponseDto[]> {
    const brands = await this.brandRepository.find();
    return plainToInstance(BrandResponseDto, brands, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number): Promise<BrandResponseDto> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return plainToInstance(BrandResponseDto, brand, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    updateBrandDto: UpdateBrandDto,
  ): Promise<BrandResponseDto> {
    const brand = await this.brandRepository.preload({ id, ...updateBrandDto });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    await this.brandRepository.save(brand);
    return plainToInstance(BrandResponseDto, brand, {
      excludeExtraneousValues: true,
    });
  }

  // ✅ Delete a Brand by ID
  async remove(id: number): Promise<void> {
    const result = await this.brandRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
  }
}
