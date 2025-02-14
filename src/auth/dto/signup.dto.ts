import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty({ example: 'john.doe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'John' })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: 'Doe' })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ example: 'StrongPass123!' })
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    role: number
}

export class LoginDto {
    @ApiProperty({ example: 'chirag@admin.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Password@1' })
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    role: number;
}

