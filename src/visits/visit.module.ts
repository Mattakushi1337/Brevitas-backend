import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";
import { User, UserSchema } from "src/user/user.schema";
import { Visit, VisitSchema } from "./shemas/visits.schemas";
import { VisitsController } from "./visits.controller";
import { VisitsService } from "./visits.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Visit', schema: VisitSchema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        UserModule
    ],
    providers: [VisitsService],
    controllers: [VisitsController],
    exports: [VisitsService]
})

export class VisitModule { }