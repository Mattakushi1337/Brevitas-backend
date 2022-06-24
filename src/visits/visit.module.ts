import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Visit, VisitSchema } from "./shemas/visits.schemas";
import { VisitsController } from "./visits.controller";
import { VisitsService } from "./visits.service";

@Module({ 
    providers: [VisitsService], 
    controllers: [VisitsController],
    imports: [
        MongooseModule.forFeature([
            {name: Visit.name, schema: VisitSchema}
        ])
    ]
})

export class VisitModule {

}