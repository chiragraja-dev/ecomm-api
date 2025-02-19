import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ example: 'Electronics', description: 'The category name' })
    name: string;

    @ApiProperty({
        example: 'Electronic products like mobile phones, laptops, smartwatches',
        description: 'A brief description of the category',
        required: false
    })
    description?: string;
}

export class UpdateCategoryDto {
    @ApiProperty({ example: 'Electronics', description: 'The category name', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        example: 'Electronic products like mobile phones, laptops, smartwatches',
        description: 'A brief description of the category',
        required: false
    })
    @IsOptional()
    @IsString()
    description?: string;
}
