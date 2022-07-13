import { Schema } from "@nestjs/mongoose"

@Schema()
export class Positions {
    links: string
    text: string
}