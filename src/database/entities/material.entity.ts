import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';

@Entity('material')
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, name: 'material_name' })
  materialName: string;

  @Column({ type: 'varchar', name: 'material_code' })
  materialCode: string;

  @ManyToOne(() => Category, { nullable: false })
  category: Category;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
