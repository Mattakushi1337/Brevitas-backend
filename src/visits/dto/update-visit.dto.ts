import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator"
import { CreateVisitDto } from "./create-visit.dto"

export class UpdateVisitDto extends CreateVisitDto {
 constructor(){
    super()
 }
}