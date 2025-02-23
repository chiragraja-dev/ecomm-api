import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entity/product-category.entity';
import { Repository } from 'typeorm';
import { ProductCategoryDto } from './dto/product-category.dto';
import { Category } from 'src/categories/entity/categories.entity';
import { Product } from 'src/product/entity/product.entity';

@Injectable()
export class ProductCategoryService {
    constructor(
        @InjectRepository(ProductCategory)
        private readonly productCategoryRepository: Repository<ProductCategory>,
        @InjectRepository(Category)
        private readonly catgoriesRepository: Repository<Category>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async assignCategoriesToProduct(productCatDto: ProductCategoryDto): Promise<{ message: string }> {
        const data = this.productCategoryRepository.create(productCatDto);
        const saveData = await this.productCategoryRepository.save(data);
        return { message: 'Categories assigned to product successfully' };
    }

    async removeCategoriesToProduct(product_id: number, category_id: number): Promise<{ message: string }> {
        try {
            const data = await this.productCategoryRepository
                .createQueryBuilder()
                .delete()
                .from(ProductCategory)
                .where('product_id = :product_id', { product_id })
                .andWhere('category_id IN (:...category_id)', { category_id })
                .execute()
            return { message: "Categories assigned to product deleted successfully" };
        } catch (error) {
            throw new BadRequestException('Failed to delete categories from product');
        }
    }

    async getCategoryByProduct(product_id: number): Promise<{ message: string, data: any }> {
        try {
            const productCategories = await this.productCategoryRepository
                .createQueryBuilder('pc')
                .select('pc.category_id')
                .where('pc.product_id = :product_id', { product_id })
                .getMany()
            const categoryIds = productCategories.map(pc => pc.category_id);
            const categories = await this.catgoriesRepository
                .createQueryBuilder('c')
                .where('c.category_id IN (:...categoryIds)', { categoryIds })
                .select('c.name')
                .getMany();
            return { message: "data fated", data: categories }
        } catch (error) {
            throw new BadRequestException('Failed to delete categories from product');
        }
    }

    async getProductByCategories(category_id: number): Promise<{ message: string, data: any }> {
        try {
            const productCategories = await this.productCategoryRepository
                .createQueryBuilder('pc')
                .select('pc.product_id')
                .where('pc.category_id = :category_id', { category_id })
                .getMany();

            const productIds = productCategories.map(pc => pc.product_id);

            const products = await this.productRepository
                .createQueryBuilder('p')
                .where('p.product_id IN (:...productIds)', { productIds })
                .select('p')
                .getMany();

            return { message: "Data fetched", data: products };
        } catch (error) {
            console.error(error.message);
            throw new BadRequestException('Failed to fetch products');
        }
    }
}
