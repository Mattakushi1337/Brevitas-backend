import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator"

export class UpdateVisitDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public name: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public surname: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public description: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public mail: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    public link: string
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    public phone: number
}