import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class NewUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public email: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public login: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    public password: string
}