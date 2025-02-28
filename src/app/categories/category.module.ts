import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController, SubCategoryController],
  providers: [CategoryService, SubCategoryService],
})
export class CategoryModule {}
