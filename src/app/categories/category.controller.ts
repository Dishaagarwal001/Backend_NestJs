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
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryResponseDto,
  PaginatedCategoryResponseDto,
} from 'src/core/dtos/category.dto';
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

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @SetMessage('Category created successfully')
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Failed to create Category' })
  async create(@Body() dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const category = await this.categoryService.create(dto);
    return plainToInstance(CategoryResponseDto, category, {
      excludeExtraneousValues: true,
    });
  }

  @Post('categoryListByPage')
  @SetMessage('Category List fetched successfully')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of all categories',
    type: [CategoryResponseDto],
  })
  async findAll(
    @Body() request: PaginatedRequestDto,
  ): Promise<PaginatedCategoryResponseDto> {
    return this.categoryService.paginatedSearch(request);
  }

  @Get(':id')
  @SetMessage('Category fetched successfully')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the category' })
  @ApiResponse({
    status: 200,
    description: 'Category found',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryService.findOne(id);
    return plainToInstance(CategoryResponseDto, category, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id')
  @SetMessage('Category updated Successfully')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the category to update',
  })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    type: CategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryService.update(id, dto);
    return plainToInstance(CategoryResponseDto, category, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @SetMessage('Category deleted successfully')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the category to delete',
  })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.remove(id);
  }
}
