import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator"

export class UpdateVisitDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly surname: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly description: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly mail: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    readonly link: string
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly phone: number
}