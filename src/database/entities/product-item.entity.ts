import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Material } from './material.entity';
import { Product } from './product.entity';
import { Currency } from './currency.entity';
import { Color } from './color.entity';
import { ProductImage } from './product-images.entity';
import { Favorite } from './favourites.entity';

@Entity('product_items')
export class ProductItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'price' })
  price: number;

  @ManyToOne(() => Currency, { nullable: false })
  currency: Currency;

  @ManyToOne(() => Color, { nullable: false })
  color: Color;

  @ManyToOne(() => Material, { nullable: false })
  material: Material;

  @ManyToOne(() => Product, { nullable: false })
  product: Product;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  @OneToMany(() => Favorite, (favorite) => favorite.productItem)
  favorites: Favorite[];

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_deleted' })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
