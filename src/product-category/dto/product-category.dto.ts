import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class ProductCategoryDto {

    @IsNotEmpty()
    product_id: number;

    @IsNotEmpty()
    category_id: number;

    // @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
    // created_at: Date;
}