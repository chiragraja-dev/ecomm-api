import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { ProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    // async updateProduct(productId: number, productDto: ProductDto): Promise<{ message: string, data: Product }> {
    //     const product = 
    // }
    async addProduct(productDto: ProductDto): Promise<{ message: string, data: Product }> {
        const newProduct = this.productRepository.create(productDto);
        const data = await this.productRepository.save(newProduct)
        return { message: "Data saved successfully", data }
    }
    async getAllProduct(): Promise<{ message: string, data: Product[] }> {
        const products = await this.productRepository.find();
        return { message: "data fateched successfully", data: products }
    }

    async updateProduct(productId: number, productDto: UpdateProductDto): Promise<{ message: string, data: Product }> {
        const data = await this.productRepository.findOne({ where: { product_id: productId } })
        if (!data) {
            throw new Error('Product not found');
        }
        for (const key in productDto) {
            if (productDto[key] !== undefined) {
                data[key] = productDto[key]
            }
        }
        return { message: "data updated ", data: await this.productRepository.save(data) }
    }
}
