import { ApiProperty } from "@nestjs/swagger"

export class ExistingUserDto {
    @ApiProperty()
    login: string
    @ApiProperty()
    password: string
}