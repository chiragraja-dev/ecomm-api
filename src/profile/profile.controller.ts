import { Body, Controller, Delete, Get, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser, RoleGuard } from 'src/auth/role.guard';
import { User } from 'src/auth/entity/user.entity';
import { OmitType } from '@nestjs/mapped-types';
import { UpdateProfileDto } from './dto/profile.dto';
import { Role } from 'src/auth/auth.controller';

@ApiTags('profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get('by-id')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'Users retrieved successfully.', type: User, isArray: true })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async getAllUser(@Req() req): Promise<Omit<User, 'PasswordHash'>> {
        const userId = req.user?.UserID;
        return await this.profileService.getProfile(userId)
    }

    @Put('update')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'Users update successfully.', type: User, isArray: true })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async updateUser(@Req() req: RequestWithUser, @Body() data: UpdateProfileDto): Promise<Omit<User, 'PasswordHash'>> {
        const user = req?.user
        return await this.profileService.updateProfile(user?.UserID ?? 0, data, user?.Role ?? 0)
    }

    @Put('activate')
    @Role(1)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiResponse({ status: 200, description: 'Users Activate successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async delete(@Query('userId') userId: number): Promise<{ message: string }> {
        return await this.profileService.activeUser(userId)
    }
}
