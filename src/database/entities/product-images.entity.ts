import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductItem } from './product-item.entity';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'image_url' })
  imageUrl: string;

  @ManyToOne(() => ProductItem, (product) => product.productImages)
  product: ProductItem;
}
