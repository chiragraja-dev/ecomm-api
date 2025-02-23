import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entity/product-category.entity';
import { Repository } from 'typeorm';
import { ProductCategoryDto } from './dto/product-category.dto';
import { Role } from 'src/auth/auth.controller';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { ProductCategoryService } from './product-category.service';

@Controller('product-category')
export class ProductCategoryController {
    constructor(
        private readonly productCatService: ProductCategoryService
    ) { }

    @Post('assign-category')
    // @Role([1, 2])
    // @UseGuards(AuthGuard('jwt'), RoleGuard)
    async assignCategoriesProduct(@Body() productCatDto: ProductCategoryDto): Promise<{ message: string }> {
        const data = await this.productCatService.assignCategoriesToProduct(productCatDto)
        return data
    }

    @Delete('delete-assign-category')
    @Role([1, 2])
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async deleteAssignCategories(@Body() { category_id, product_id }: ProductCategoryDto): Promise<{ message: string }> {
        const data = await this.productCatService.removeCategoriesToProduct(product_id, category_id)
        return data
    }

    @Get('get-categories/:productId')
    async getCategoriesByProductId(@Param('productId') productId: number): Promise<{ message: string, data: any }> {
        return this.productCatService.getCategoryByProduct(productId)
    }

    @Get('get-product/:categoryId')
    async getProductByCatId(@Param('categoryId') categoryId: number): Promise<{ message: string, data: any }> {
        console.log("cat id", categoryId)
        return this.productCatService.getProductByCategories(categoryId)
    }
}