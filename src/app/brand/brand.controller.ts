import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import {
  CreateBrandDto,
  UpdateBrandDto,
  BrandResponseDto,
} from 'src/core/dtos/brand.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiBody({ type: CreateBrandDto })
  @ApiResponse({
    status: 201,
    description: 'Brand created successfully',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async create(
    @Body() createBrandDto: CreateBrandDto,
  ): Promise<BrandResponseDto> {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({
    status: 200,
    description: 'List of all brands',
    type: [BrandResponseDto],
  })
  async findAll(): Promise<BrandResponseDto[]> {
    return this.brandService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a brand by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the brand' })
  @ApiResponse({
    status: 200,
    description: 'Brand found',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BrandResponseDto> {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a brand by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the brand to update',
  })
  @ApiBody({ type: UpdateBrandDto })
  @ApiResponse({
    status: 200,
    description: 'Brand updated successfully',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<BrandResponseDto> {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the brand to delete',
  })
  @ApiResponse({ status: 200, description: 'Brand deleted successfully' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.brandService.remove(id);
    return { message: `Brand with ID ${id} deleted successfully` };
  }
}
