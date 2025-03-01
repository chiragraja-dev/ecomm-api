// import { BadRequestException, Injectable } from '@nestjs/common';
// import { Inventory } from './enity/inventory.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Product } from 'src/product/entity/product.entity';

// @Injectable()
// export class InventoryService {
//     constructor(
//         @InjectRepository(Inventory)
//         private readonly inventoryRepository: Repository<Inventory>,
//         @InjectRepository(Product)
//         private readonly productRepository: Repository<Product>,
//     ) { }

//     async addInventory(user_id: number, product_id: number, quantity: number): Promise<{ message: string }> {
//         const productData = await this.productRepository.findOne({ where: { product_id: product_id } })
//         if (!productData) {
//             new BadRequestException("Product Id not found")
//         }
//         const data = this.inventoryRepository.create({ user_id, product_id, quantity })
//         const savedData = await this.inventoryRepository.save(data);
//         return { message: "data saved" }
//     }
// }

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './enity/inventory.entity';
import { Product } from '../product/entity/product.entity';
import { User } from '../auth/entity/user.entity';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async addInventory(user_id: number, product_id: number, quantity: number): Promise<{ message: string }> {
        const productData = await this.productRepository.findOne({ where: { product_id } });
        if (!productData) {
            throw new BadRequestException("Product Id not found");
        }

        const userData = await this.userRepository.findOne({ where: { UserID: user_id } });
        if (!userData) {
            throw new BadRequestException("User Id not found");
        }

        const data = this.inventoryRepository.create({
            user_id,
            product_id,
            quantity,
            user: userData,
            product: productData
        });

        const savedData = await this.inventoryRepository.save(data);
        return { message: "data saved" };
    }

    async getInventory(): Promise<{ message: string, data: Inventory[] }> {
        const data = await this.inventoryRepository.find({
            relations: ['product', 'user']
        });
        return { message: "data fated", data }
    }

    async updateInverntory(inventory_id: number, product_id: number, quantity: number): Promise<{ message: string }> {

        const inventory = await this.inventoryRepository.findOne({ where: { inventory_id } })
        if (!inventory) {
            new BadRequestException(`No Data found for inventory id ${inventory_id}`)
        } else {
            inventory.product_id = product_id;
            inventory.quantity = quantity
            await this.inventoryRepository.save(inventory);
        }
        return { message: 'Inventory record updated successfully' };
        // } catch (error) {
        //     new BadRequestException(`Something went wrong`)
        // }

    }
}
