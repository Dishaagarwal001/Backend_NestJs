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
  ApiOkResponse,
} from '@nestjs/swagger';
import { SetMessage } from 'src/core/decorators/set-message.decorator';
import { PaginatedRequestDto } from 'src/core/dtos/pagination.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @SetMessage('Brand created successfully')
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
  @SetMessage('Brand List fetched successfully')
  @ApiOperation({
    summary: 'Get paginated list of brands',
  })
  @ApiBody({
    type: PaginatedRequestDto,
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
            totalPages: {
              type: 'number',
              example: 5,
              description: 'Total number of pages',
            },
            totalItems: {
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
  @SetMessage('Brand fetched successfully')
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
    const brand = this.brandService.findOne(id);
    return plainToInstance(BrandResponseDto, brand, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @SetMessage('Brand updated successfully')
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
