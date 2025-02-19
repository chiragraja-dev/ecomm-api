import { Controller, Post, Body, UseGuards, Get, Put, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/auth.controller';
import { AuthGuard } from '@nestjs/passport';
import { Product } from './entity/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('add')
    @Role([1])
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiOperation({ summary: 'Add a new product' })
    @ApiResponse({ status: 201, description: 'Product added successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async addProduct(@Body() productDto: ProductDto) {
        return this.productService.addProduct(productDto);
    }

    @Get('get')
    async getAllProduct(): Promise<{ message: string, data: Product[] }> {
        return this.productService.getAllProduct()
    }

    @Put('update')
    @Role([1])
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async updateProduct(@Param('id') id: number, @Body() productDto: UpdateProductDto): Promise<{ message: string, data: Product }> {
        return this.productService.updateProduct(id, productDto)
    }


}
