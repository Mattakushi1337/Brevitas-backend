import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class ExistingUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    login: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string
}