import { BadRequestException, Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/auth.controller';
import { AddInventoryDto, UpdateInventoryDto } from './dto/inventory.dto';
import { GetUser } from 'src/auth/decorator/get-userdecorator';
import { Inventory } from './enity/inventory.entity';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Post('add')
    @Role([1, 2])
    @UseGuards(JwtAuthGuard, RoleGuard)
    async addInverntory(@Body() data: AddInventoryDto, @GetUser() user: any) {
        const res = this.inventoryService.addInventory(user.UserID, data.product_id, data.quantity)
        return res
    }

    @Get('')
    async getInventory(): Promise<{ message: string, data: Inventory[] }> {
        return this.inventoryService.getInventory()
    }

    @Put('update')
    async updateInventory(@Body() data: UpdateInventoryDto): Promise<{ message: string }> {
        if (!data.inventory_id) {
            return new BadRequestException("inventory_id not found")
        } else if (!data.product_id && !data.quantity) {
            return new BadRequestException("No data found for update")
        }
        return this.inventoryService.updateInverntory(data.inventory_id, data.product_id, data.quantity)
    }
}
