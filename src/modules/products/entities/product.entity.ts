import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { InfoProduct } from './info-product.entity';
import { Categories } from 'src/modules/categories/entities/category.entity';
import { StatusProduct } from 'src/common/enums/status-product.enum';
import { Keyword } from 'src/modules/keywords/entities/keyword.entity';
import { ProductWareHouse } from './product-warehouse.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  url: string;

  @Column()
  display: boolean;

  @Column({
    type: 'enum',
    enum: StatusProduct,
  })
  status: StatusProduct;

  @Column()
  avatar: string;

  @Column()
  price: number;

  @Column()
  discountPrice: number;

  @Column()
  discount: number;

  @Column({ type: 'json', nullable: true })
  image: string[];

  @OneToMany(() => InfoProduct, (info) => info.product)
  information: InfoProduct[];

  @OneToOne(
    () => ProductWareHouse,
    (productWareHouse) => productWareHouse.product,
  )
  productWareHouse: ProductWareHouse;

  @ManyToMany(() => Categories)
  @JoinTable({
    name: 'product_categories',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Categories[];

  @Column({ type: 'json', nullable: true })
  flashSale?: {
    flashSaleStartTime: Date;
    flashSaleEndTime: Date;
    flashSaleDiscount: number;
    flashSalePrice: number;
  };

  @ManyToMany(() => Keyword)
  @JoinTable({
    name: 'product_keywords',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'keyword_id', referencedColumnName: 'id' },
  })
  keywords: Keyword[];

  @Column({ type: 'json', nullable: true })
  seo?: {
    title: string;
    description: string;
  };
}
