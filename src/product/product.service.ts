import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { ProductDto } from './dto/product.dto';

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
    // async updateProduct(productId: number, productDto: ProductDto): Promise<{ message: string, data: Product }> {
    //     const product = 
    // }
}
