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
  PaginatedBrandResponseDto,
} from 'src/core/dtos/brand.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
} from '@nestjs/swagger';
import { SetMessage } from 'src/core/decorators/set-message.decorator';
import { PaginatedRequestDto } from 'src/core/dtos/pagination.dto';

@ApiTags('Brand')
@Controller('brand')
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

  @Post('brandListByPage')
  @ApiOperation({
    summary: 'Get paginated list of brands',
  })
  @ApiExtraModels(PaginatedBrandResponseDto)
  @ApiBody({
    description: 'Pagination, filtering and sorting parameters',
    schema: {
      example: {
        page: 1,
        size: 10,
        search: 'nike',
        filter: {
          isActive: true,
        },
        sortBy: [
          {
            key: 'createdAt',
            direction: 'desc',
          },
        ],
      },
    },
  })
  @ApiOkResponse({
    description: 'Paginated list of brands returned successfully',
    schema: {
      allOf: [
        { $ref: '#/components/schemas/PaginatedResponseDto' },
        {
          properties: {
            items: {
              type: 'array',
              items: { $ref: '#/components/schemas/BrandResponseDto' },
            },
            pageSize: {
              type: 'number',
              example: 10,
              description: 'Number of items per page',
            },
            currentPage: {
              type: 'number',
              example: 1,
              description: 'Current page number',
            },
            numberOfPages: {
              type: 'number',
              example: 5,
              description: 'Total number of pages',
            },
            numberOfItems: {
              type: 'number',
              example: 42,
              description: 'Total number of matching items',
            },
            sortBy: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  key: {
                    type: 'string',
                    example: 'brandName',
                  },
                  direction: {
                    type: 'string',
                    enum: ['asc', 'desc'],
                    example: 'desc',
                  },
                },
              },
              example: [{ key: 'brandName', direction: 'desc' }],
              description: 'Sorting criteria used',
            },
          },
        },
      ],
    },
  })
  async findAll(
    @Body() request: PaginatedRequestDto,
  ): Promise<PaginatedBrandResponseDto> {
    return this.brandService.paginatedSearch(request);
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
  @SetMessage('Brand deleted successfully')
  @ApiOperation({ summary: 'Delete a brand by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the brand to delete',
  })
  @ApiResponse({ status: 200, description: 'Brand deleted successfully' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.brandService.remove(id);
  }
}
