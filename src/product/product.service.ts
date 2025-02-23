import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { Category } from 'src/categories/entity/categories.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async addProduct(productDto: ProductDto): Promise<{ message: string, data: Product }> {
        const newProduct = this.productRepository.create(productDto);
        const data = await this.productRepository.save(newProduct)
        return { message: "Data saved successfully", data }
    }
    async getAllProduct(
        page: number,
        limit: number,
        sortBy: string,
        sortOrder: 'ASC' | 'DESC'
    ): Promise<{ message: string, total: number, data: Product[] }> {
        const skip = (page - 1) * limit;
        const order = sortBy ? { [sortBy]: sortOrder } : undefined;
        const [data, total] = await this.productRepository.findAndCount({
            skip,
            take: limit,
            order
        });
        return { message: "data fateched successfully", total, data: data }
    }

    async updateProduct(productId: number, productDto: UpdateProductDto): Promise<{ message: string, data: Product }> {
        const data = await this.productRepository.findOne({ where: { product_id: productId } })
        if (!data) {
            throw new BadRequestException('Product not found');
        }
        for (const key in productDto) {
            if (productDto[key] !== undefined) {
                data[key] = productDto[key]
            }
        }
        return { message: "data updated ", data: await this.productRepository.save(data) }
    }

    async getProductById(product_id: number): Promise<{ message: string, data: Product | {} }> {
        const product = await this.productRepository.findOne({ where: { product_id } })
        if (!product) {
            throw new BadRequestException('Product not found');
        }
        return { message: "Product fetched successfully", data: product }
    }

    async deleteProduct(product_id: number): Promise<{ message: string }> {
        const product = await this.productRepository.findOne({ where: { product_id } })
        if (!product) {
            throw new BadRequestException('Product not found');
        }
        const deleteData = await this.productRepository.delete(product_id)
        return { message: "Product deleted successfully" }
    }

}
