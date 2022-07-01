import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Visit, VisitSchema } from "./shemas/visits.schemas";
import { VisitsController } from "./visits.controller";
import { VisitsService } from "./visits.service";

@Module({ 
    imports: [MongooseModule.forFeature([{name: Visit.name, schema: VisitSchema}])],
    providers: [VisitsService], 
    controllers: [VisitsController],
})

export class VisitModule {}