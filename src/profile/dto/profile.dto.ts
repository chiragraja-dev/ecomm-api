import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsPhoneNumber, IsDate, IsUrl, IsBoolean } from 'class-validator';

export class UpdateProfileDto {
    @ApiPropertyOptional({ example: 'John', description: 'First name of the user' })
    @IsOptional()
    @IsString()
    FirstName?: string;

    @ApiPropertyOptional({ example: 'Doe', description: 'Last name of the user' })
    @IsOptional()
    @IsString()
    LastName?: string;

    @ApiPropertyOptional({ example: '+1234567890', description: 'Phone number of the user' })
    @IsOptional()
    @IsPhoneNumber()
    PhoneNumber?: string;

    @ApiPropertyOptional({ example: '1995-08-15', description: 'Date of birth in YYYY-MM-DD format' })
    @IsOptional()
    @IsDate()
    DateOfBirth?: Date;

    @ApiPropertyOptional({ example: 'Male', description: 'Gender of the user' })
    @IsOptional()
    @IsString()
    Gender?: string;

    @ApiPropertyOptional({ example: '123 Main St', description: 'Residential address' })
    @IsOptional()
    @IsString()
    Address?: string;

    @ApiPropertyOptional({ example: 'New York', description: 'City of residence' })
    @IsOptional()
    @IsString()
    City?: string;

    @ApiPropertyOptional({ example: 'NY', description: 'State of residence' })
    @IsOptional()
    @IsString()
    State?: string;

    @ApiPropertyOptional({ example: 'USA', description: 'Country of residence' })
    @IsOptional()
    @IsString()
    Country?: string;

    @ApiPropertyOptional({ example: '10001', description: 'Postal code' })
    @IsOptional()
    @IsString()
    PostalCode?: string;

    @ApiPropertyOptional({ example: 'https://example.com/profile.jpg', description: 'URL of the profile picture' })
    @IsOptional()
    @IsUrl()
    ProfilePictureURL?: string;

    @ApiPropertyOptional({ example: true, description: 'User active status (only Role 1 users can update this)' })
    @IsOptional()
    @IsBoolean()
    IsActive?: boolean;
}
