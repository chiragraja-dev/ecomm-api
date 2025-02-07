import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { Repository } from 'typeorm';
import { OmitType } from '@nestjs/mapped-types';
import { UpdateProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(User)
        private profileRepository: Repository<User>,
        // private jwtService: JwtService
    ) { }

    async getProfile(userId: number): Promise<Omit<User, 'PasswordHash'>> {
        const userExist = await this.profileRepository.findOne({ where: { UserID: userId } })
        if (!userExist) {
            throw new BadRequestException('User not found')
        }
        const { PasswordHash, ...userData } = userExist
        return userData
    }

    async updateProfile(userId: number, data: UpdateProfileDto, role: number): Promise<Omit<User, "PasswordHash">> {
        const userExist = this.profileRepository.find({ where: { UserID: userId } })
        if (!userExist) {
            throw new NotFoundException('User not found');
        }
        const userData = data
        if ('IsActive' in data) {
            if (role !== 1) {
                throw new ForbiddenException('Only users with Role 1 can update IsActive status.');
            }
            data.IsActive = Boolean(data.IsActive)
        }
        await this.profileRepository.update(userId, userData)
        const updatedData = await this.getProfile(userId)
        return updatedData
    }

    async deleteUser(userId: number): Promise<{ message: string }> {
        const userExist = this.profileRepository.find({ where: { UserID: userId } })
        if (!userExist) {
            throw new NotFoundException('User not found');
        }
        await this.profileRepository.update(userId, { IsActive: false });

        return { message: 'User deleted successfully' };
    }

    async activeUser(userId: number): Promise<{ message: string }> {
        const userExist = this.profileRepository.find({ where: { UserID: userId } })
        if (!userExist) {
            throw new NotFoundException('User not found');
        }
        await this.profileRepository.update(userId, { IsActive: true });

        return { message: 'User Recover successfully' };
    }
}

