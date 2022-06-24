import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type VisitDocument = Visit & Document

@Schema()
export class Visit {
    @Prop()
    name: string

    @Prop()
    phone: number

}
export const VisitSchema = SchemaFactory.createForClass(Visit)