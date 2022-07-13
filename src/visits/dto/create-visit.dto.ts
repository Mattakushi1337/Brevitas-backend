import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl, } from "class-validator"
import { Color } from "../shemas/color.schemas"
import { Justify } from "../shemas/justify.schemas"
import { Positions } from "../shemas/position.schemas"
import { Sizes } from "../shemas/sizes.schemas"

export class CreateVisitDto {
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
    @ApiProperty()
    @IsNotEmpty()
    readonly color: Color
    @ApiProperty()
    @IsNotEmpty()
    readonly positions: Positions
    @ApiProperty()
    @IsNotEmpty()
    readonly sizes: Sizes
    @ApiProperty()
    @IsNotEmpty()
    readonly justify: Justify
}