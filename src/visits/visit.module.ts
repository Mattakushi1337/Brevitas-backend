import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { User, UserSchema } from "src/user/user.schema";
import { Visit, VisitSchema } from "./shemas/visits.schemas";
import { VisitsController } from "./visits.controller";
import { VisitsService } from "./visits.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Visit.name, schema: VisitSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [VisitsService],
    controllers: [VisitsController]
})

export class VisitModule { }