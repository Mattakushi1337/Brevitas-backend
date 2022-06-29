import { ApiProperty } from "@nestjs/swagger"

export class NewUserDto {
    @ApiProperty()
    email: string
    @ApiProperty()
    login: string
    @ApiProperty()
    password: string
}