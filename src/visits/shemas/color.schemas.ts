import { Schema } from "@nestjs/mongoose"

@Schema()
export class Color {
    background: string
    text: string
    links: string
}