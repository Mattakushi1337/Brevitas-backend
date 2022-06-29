import { ApiProperty } from "@nestjs/swagger"

export class CreateVisitDto {
    @ApiProperty()
    readonly name: string
    @ApiProperty()
    readonly surname: string
    @ApiProperty()
    readonly description: string
    @ApiProperty()
    readonly mail: string
    @ApiProperty()
    readonly link: string
    @ApiProperty()
    readonly phone: number
}