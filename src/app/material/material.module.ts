import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from 'src/database/entities/material.entity';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { Category } from 'src/database/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Material, Category])],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
