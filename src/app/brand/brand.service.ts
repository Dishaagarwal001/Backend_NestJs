import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from 'src/database/entities/brand.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
  BrandResponseDto,
  PaginatedBrandResponseDto,
} from 'src/core/dtos/brand.dto';
import { PaginatedRequestDto } from 'src/core/dtos/pagination.dto';
import { BaseService } from '../base.service';

@Injectable()
export class BrandService extends BaseService<Brand, BrandResponseDto> {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {
    super(brandRepository, BrandResponseDto, ['brandName']);
  }

  async paginatedSearch(
    query: PaginatedRequestDto,
  ): Promise<PaginatedBrandResponseDto> {
    return super.paginate(query) as Promise<PaginatedBrandResponseDto>;
  }

  async create(createBrandDto: CreateBrandDto): Promise<BrandResponseDto> {
    const existingByCode = await this.brandRepository.findOne({
      where: { brandCode: createBrandDto.brandCode },
    });
    if (existingByCode) {
      throw new ConflictException('Brand with this code already exists');
    }

    const existingByName = await this.brandRepository.findOne({
      where: { brandName: createBrandDto.brandName },
    });
    if (existingByName) {
      throw new ConflictException('Brand with this name already exists');
    }

    const newBrand = this.brandRepository.create(createBrandDto);
    const savedBrand = await this.brandRepository.save(newBrand);
    return this.toDto(savedBrand);
  }

  async findOne(id: number): Promise<BrandResponseDto> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return this.toDto(brand);
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
    return this.toDto(brand);
  }

  async remove(id: number): Promise<void> {
    const result = await this.brandRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
  }
}
