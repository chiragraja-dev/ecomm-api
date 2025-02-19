import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }
    async createCategory(createCategoryDto: CreateCategoryDto[]): Promise<Category[]> {
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }

    async getCategories(): Promise<Category[]> {
        const categories = this.categoryRepository.find()
        return categories
    }

    async getCategoryById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { category_id: id } });
        if (!category) {
            throw new Error('Category not found');
        }
        return category
    }

    async deleteCategory(id: number): Promise<{ message: string }> {

        const result = await this.categoryRepository.delete(id)
        if (result.affected === 0) {
            throw new Error('Category not found');
        }
        return { message: "deleted successfully" }
    }

    async updateCategory(id: number, updateData: UpdateCategoryDto): Promise<Category[]> {
        const category = await this.categoryRepository.find({ where: { category_id: id } })
        console.log(category)
        if (!category) {
            throw new Error('Category not found');
        }
        if (updateData.name !== undefined) {
            category[0].name = updateData.name
        }
        if (updateData.description !== undefined) {
            category[0].description = updateData.description
        }
        return this.categoryRepository.save(category);

    }
}
