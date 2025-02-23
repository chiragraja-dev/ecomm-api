import { Controller, Post, Body, UseGuards, Get, Put, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
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
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'sortBy', required: false, type: String, example: 'name' })
    @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'], example: 'ASC' })
    async getAllProduct(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('sortBy') sortBy?: string,  // <-- Optional with `?`
        @Query('sortOrder') sortOrder?: 'ASC' | 'DESC', // <-- Optional with `?`
    ): Promise<{ message: string, data: Product[], total: number, currentPage: number, totalPages: number }> {
        const { data, total } = await this.productService.getAllProduct(
            page,
            limit,
            sortBy || 'name',
            sortOrder || 'ASC',
        );
        const totalPages = Math.ceil(total / limit);
        return {
            message: 'Products retrieved successfully',
            data,
            total,
            currentPage: page,
            totalPages,
        };
    }

    @Put('update')
    @Role([1])
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async updateProduct(@Param('id') id: number, @Body() productDto: UpdateProductDto): Promise<{ message: string, data: Product }> {
        return this.productService.updateProduct(id, productDto)
    }

    @Get('get/:id')
    async getProductById(@Param('id') id: number): Promise<{ message: string, data: Product | {} }> {
        return this.productService.getProductById(id)
    }
    @Delete('delete/:id')
    async deletePrduct(@Param('id') id: number): Promise<{ message: string }> {
        return this.productService.deleteProduct(id)
    }
}
