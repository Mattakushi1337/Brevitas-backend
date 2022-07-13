import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import mongoose, { Document, ObjectId } from "mongoose";
import Role from "src/auth/guards/role.enum";

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
    @Prop({
        enum: Role,
        default: Role.User,
    })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);