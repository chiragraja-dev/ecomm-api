import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<User> {
        const { email, firstName, lastName, password } = signUpDto;
        // const userExist = await this.userRepository.findOne({ where: { Email: email } })
        const userExist = await this.userRepository.findOne({ where: { Email: email } });

        if (userExist) {
            throw new BadRequestException('Email already in use')
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            Email: email,
            FirstName: firstName,
            LastName: lastName,
            PasswordHash: passwordHash,
        });
        return this.userRepository.save(newUser)
    }
    async login(loginDto: LoginDto): Promise<{ token: string, email: string, name: string }> {
        const { email, password, role } = loginDto;
        const userExist = await this.userRepository.findOne({ where: { Email: email } });
        if (!userExist) {
            throw new BadRequestException('Email not present')
        }
        const isPasswordMatch = await bcrypt.compare(password, userExist.PasswordHash)
        if (!isPasswordMatch) {
            throw new UnauthorizedException('Password is not matching')
        }
        const token = this.jwtService.sign({
            UserID: userExist.UserID,
            Email: userExist.Email,
            Role: userExist.Role,
        }, {
            expiresIn: '1h'
        });
        return {
            token: token,
            email: userExist.Email,
            name: userExist.FirstName + " " + userExist.LastName
        }
    }

    async getAllUser(): Promise<User[]> {
        const userExist = await this.userRepository.find();
        return userExist
    }
}
