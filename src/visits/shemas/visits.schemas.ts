import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import mongoose, { Document, ObjectId } from "mongoose";
import { User } from "src/user/user.schema";
import { Color } from "./color.schemas";
import { Justify } from "./justify.schemas";
import { Positions } from "./position.schemas";
import { Sizes } from "./sizes.schemas";

export type VisitDocument = Visit & Document

// TODO: Объединить объекты по смыслу (Done)
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
    color: Color
    @Prop()
    positions: Positions
    @Prop()
    sizes: Sizes
    @Prop()
    justify: Justify
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    user: User
}
export const VisitSchema = SchemaFactory.createForClass(Visit)