import { Schema } from "@nestjs/mongoose"

@Schema()
export class Sizes {
    text: number
    const: number
}