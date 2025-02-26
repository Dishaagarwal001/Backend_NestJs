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
  PaginatedMaterialResponseDto,
} from 'src/core/dtos/material.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PaginatedRequestDto } from 'src/core/dtos/pagination.dto';
import { SetMessage } from 'src/core/decorators/set-message.decorator';

@ApiTags('Material')
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @SetMessage('Materal Added successfully')
  @ApiOperation({ summary: 'Create a new material' })
  @ApiBody({ type: CreateMaterialDto })
  @ApiResponse({
    status: 201,
    description: 'Material created Successfully',
    type: MaterialResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async create(
    @Body() createMaterialDto: CreateMaterialDto,
  ): Promise<MaterialResponseDto> {
    return this.materialService.create(createMaterialDto);
  }

  @Post('materialListByPage')
  @SetMessage('Materal List fetched successfully')
  @ApiOperation({ summary: 'Get all materials' })
  @ApiResponse({
    status: 200,
    description: 'List of all materials',
    type: [PaginatedMaterialResponseDto],
  })
  async findAll(
    @Body() request: PaginatedRequestDto,
  ): Promise<PaginatedMaterialResponseDto> {
    const paginatedResponse =
      await this.materialService.paginatedSearch(request);
    return plainToInstance(PaginatedMaterialResponseDto, paginatedResponse, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @SetMessage('Materal fetched successfully')
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
    const material = this.materialService.findOne(id);
    return plainToInstance(MaterialResponseDto, material, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @SetMessage('Materal updated successfully')
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
  @SetMessage('Materal deleted successfully')
  @ApiOperation({ summary: 'Delete a material by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the material to delete',
  })
  @ApiResponse({ status: 200, description: 'Material deleted successfully' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.materialService.remove(id);
  }
}
