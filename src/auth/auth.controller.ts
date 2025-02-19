import { Body, Controller, Get, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto/signup.dto';
import { User } from './entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from './role.guard';

export const Role = (role: number[]) => SetMetadata('role', role);
@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('Signup')
    @ApiResponse({ status: 201, description: 'User registered successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async signUp(@Body() signUpDto: SignUpDto) {
        return await this.authService.signUp(signUpDto)
    }

    @Post('login')
    @ApiResponse({ status: 201, description: 'User login successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto)
    }


    @Get('get-user')
    @Role([1])
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiResponse({ status: 200, description: 'Users retrieved successfully.', type: User, isArray: true })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async getAllUsers(@Req() req): Promise<User[]> {
        return await this.authService.getAllUser();
    }
}
