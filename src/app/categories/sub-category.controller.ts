import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { PaginatedRequestDto } from 'src/core/dtos/pagination.dto';
import { SetMessage } from 'src/core/decorators/set-message.decorator';
import {
  CreateSubCategoryDto,
  PaginatedSubCategoryResponseDto,
  SubCategoryResponseDto,
  UpdateSubCategoryDto,
} from 'src/core/dtos/sub-category.dto';
import { SubCategoryService } from './sub-category.service';

@ApiTags('SubCategory')
@Controller('subCategory')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post()
  @SetMessage('SubCategory created successfully')
  @ApiOperation({ summary: 'Create a new sub-category' })
  @ApiBody({ type: CreateSubCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'SubCategory created successfully',
    type: SubCategoryResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Failed to create SubCategory' })
  async create(
    @Body() dto: CreateSubCategoryDto,
  ): Promise<SubCategoryResponseDto> {
    return this.subCategoryService.create(dto);
  }

  @Post('subCategoryListByPage/:categoryId')
  @SetMessage('SubCategory List fetched successfully')
  @ApiOperation({ summary: 'Get all sub categories by category id' })
  @ApiResponse({
    status: 200,
    description: 'List of all sub-categories',
    type: [SubCategoryResponseDto],
  })
  async findAllSubCategories(
    @Body() request: PaginatedRequestDto,
    @Param('categoryId', ParseIntPipe) id: number,
  ): Promise<PaginatedSubCategoryResponseDto> {
    return this.subCategoryService.paginatedSearch(request, id);
  }

  @Get(':id')
  @SetMessage('SubCategory fetched successfully')
  @ApiOperation({ summary: 'Get a SubCategory by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the SubCategory' })
  @ApiResponse({
    status: 200,
    description: 'SubCategory found',
    type: SubCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'SubCategory not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SubCategoryResponseDto> {
    const category = await this.subCategoryService.findOne(id);
    return plainToInstance(SubCategoryResponseDto, category, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  @SetMessage('SubCategory updated Successfully')
  @ApiOperation({ summary: 'Update a SubCategory by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the sub-category to update',
  })
  @ApiBody({ type: UpdateSubCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'SubCategory updated successfully',
    type: SubCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'SubCategory not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSubCategoryDto,
  ): Promise<SubCategoryResponseDto> {
    return this.subCategoryService.update(id, dto);
  }

  @Delete(':id')
  @SetMessage('SUbCategory deleted successfully')
  @ApiOperation({ summary: 'Delete a sub-category by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the sub-category to delete',
  })
  @ApiResponse({ status: 200, description: 'SubCategory deleted successfully' })
  @ApiResponse({ status: 404, description: 'SubCategory not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.subCategoryService.remove(id);
  }
}
