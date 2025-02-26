import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, name: 'product_name' })
  productName: string;

  @Column({ type: 'varchar', length: 150, name: 'description' })
  description: string;

  @Column({ type: 'varchar', length: 30, name: 'product_code', unique: true })
  productCode: string;

  @ManyToOne(() => Brand, { nullable: false })
  brand: Brand;

  @ManyToOne(() => Category, { nullable: false })
  category: Category;

  @ManyToOne(() => Category, { nullable: true })
  subCategory: Category;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_deleted' })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
