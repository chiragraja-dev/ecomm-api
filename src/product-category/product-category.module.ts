import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryService } from './product-category.service';
import { ProductCategory } from './entity/product-category.entity';
import { ProductCategoryController } from './product-category.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { Category } from 'src/categories/entity/categories.entity';
import { Product } from 'src/product/entity/product.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCategory, Category, Product]),
        JwtModule,
        CategoriesModule,
        ProductModule
    ],
    controllers: [ProductCategoryController],
    providers: [ProductCategoryService],
    exports: [TypeOrmModule]
})
export class ProductCategoryModule { }
