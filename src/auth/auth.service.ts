import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
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
}
