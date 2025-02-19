import { ApiProperty } from '@nestjs/swagger';

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
