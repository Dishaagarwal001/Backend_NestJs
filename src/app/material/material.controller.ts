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
import { MaterialService } from './material.service';
import {
  CreateMaterialDto,
  UpdateMaterialDto,
  MaterialResponseDto,
} from 'src/core/dtos/material.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Materials')
@Controller('materials')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new material' })
  @ApiBody({ type: CreateMaterialDto })
  @ApiResponse({
    status: 201,
    description: 'Material created successfully',
    type: MaterialResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async create(
    @Body() createMaterialDto: CreateMaterialDto,
  ): Promise<MaterialResponseDto> {
    return this.materialService.create(createMaterialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all materials' })
  @ApiResponse({
    status: 200,
    description: 'List of all materials',
    type: [MaterialResponseDto],
  })
  async findAll(): Promise<MaterialResponseDto[]> {
    return this.materialService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a material by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the material' })
  @ApiResponse({
    status: 200,
    description: 'Material found',
    type: MaterialResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Material not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MaterialResponseDto> {
    return this.materialService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a material by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the material to update',
  })
  @ApiBody({ type: UpdateMaterialDto })
  @ApiResponse({
    status: 200,
    description: 'Material updated successfully',
    type: MaterialResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Material not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ): Promise<MaterialResponseDto> {
    return this.materialService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a material by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the material to delete',
  })
  @ApiResponse({ status: 200, description: 'Material deleted successfully' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.materialService.remove(id);
    return { message: `Material with ID ${id} deleted successfully` };
  }
}
