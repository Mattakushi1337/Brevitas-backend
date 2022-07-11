import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import mongoose, { Document, ObjectId } from "mongoose";
import { User } from "src/user/user.schema";

export type VisitDocument = Visit & Document

@Schema()
export class Visit {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;
    @Prop()
    name: string
    @Prop()
    surname: string
    @Prop()
    description: string
    @Prop()
    mail: string
    @Prop()
    link: string
    @Prop()
    phone: number
    @Prop()
    backgroundColor: string
    @Prop()
    textColor: string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    user: User;
}
export const VisitSchema = SchemaFactory.createForClass(Visit)