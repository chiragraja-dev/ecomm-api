import { IsInt, Min } from "class-validator";

export class AddInventoryDto {
    @IsInt()
    product_id: number;

    @IsInt()
    @Min(1, { message: 'Quantity must be greater than 0' })
    quantity: number;
}

export class UpdateInventoryDto {
    @IsInt()
    product_id: number;

    @IsInt()
    inventory_id: number

    @IsInt()
    @Min(1, { message: 'Quantity must be greater than 0' })
    quantity: number;
}