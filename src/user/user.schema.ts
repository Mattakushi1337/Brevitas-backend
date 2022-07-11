import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import mongoose, { Document, ObjectId } from "mongoose";
import { Visit } from "src/visits/shemas/visits.schemas";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Transform(({ value }) => value.toString())
    _id: string;
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ unique: true })
    login: string;
    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);