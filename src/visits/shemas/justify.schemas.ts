import { Schema } from "@nestjs/mongoose"

@Schema()
export class Justify {
    text: string
    cont: string
}