import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class ProductDto {
    @ApiProperty({ example: 'Apple iPhone 15 Plus (Black, 128 GB)' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: "Experience the iPhone 15 Plus – your dynamic companion. Dynamic Island ensures you stay connected, bubbling up alerts seamlessly while you're busy. Its durable design features infused glass and aerospace-grade aluminum, making it dependable and resistant to water and dust. Capture life with precision using the 48 MP Main Camera, perfect for any shot. Powered by the A16 Bionic Processor, it excels in computational photography and more, all while conserving battery life. Plus, it's USB-C compatible, simplifying your charging needs. Elevate your tech game with the iPhone 15 Plus – innovation at your fingertips. Goodbye cable clutter, hello convenience." })
    description: string;

    @ApiProperty({ example: 66999.00 })
    @IsNotEmpty()
    price: number;

    @ApiProperty({ example: "https://rukminim2.flixcart.com/image/312/312/ktketu80/mobile/s/l/c/iphone-13-mlpf3hn-a-apple-original-imag6vzz5qvejz8z.jpeg?q=70" })
    image_url: string
}


export class UpdateProductDto {
    @ApiProperty({ example: 'Apple iPhone 15 Plus (Black, 128 GB)' })
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @ApiProperty({ example: "Experience the iPhone 15 Plus – your dynamic companion. Dynamic Island ensures you stay connected, bubbling up alerts seamlessly while you're busy. Its durable design features infused glass and aerospace-grade aluminum, making it dependable and resistant to water and dust. Capture life with precision using the 48 MP Main Camera, perfect for any shot. Powered by the A16 Bionic Processor, it excels in computational photography and more, all while conserving battery life. Plus, it's USB-C compatible, simplifying your charging needs. Elevate your tech game with the iPhone 15 Plus – innovation at your fingertips. Goodbye cable clutter, hello convenience." })
    @IsOptional()
    description: string;

    @ApiProperty({ example: 66999.00 })
    @IsNotEmpty()
    @IsOptional()
    price: number;

    @ApiProperty({ example: "https://rukminim2.flixcart.com/image/312/312/ktketu80/mobile/s/l/c/iphone-13-mlpf3hn-a-apple-original-imag6vzz5qvejz8z.jpeg?q=70" })
    @IsOptional()
    image_url: string
}

// export class Category {

// }