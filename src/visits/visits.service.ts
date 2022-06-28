import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateVisitDto } from "./dto/create-visit.dto";
import { UpdateVisitDto } from "./dto/update-visit.dto";
import { Visit, VisitDocument } from "./shemas/visits.schemas";


@Injectable()
export class VisitsService {
    findallwhere(): Promise<Visit[]> {
        throw new Error('Method not implemented.');
    }


    constructor(@InjectModel(Visit.name) private visitModel: Model<VisitDocument>) {
    }


    private visits = []

    async getAll(): Promise<Visit[]> {
        return this.visitModel.find().exec()
    }


    async getById(id: string): Promise<Visit> {
        return this.visitModel.findById(id)
    }


    async create(visitdto: CreateVisitDto): Promise<Visit> {
     const newVisit = new this.visitModel(visitdto)
     return newVisit.save()
    }
    

    async remove(id: string): Promise<Visit> {
        return this.visitModel.findByIdAndRemove(id)
    }


    async update(id: string, visitdto: UpdateVisitDto): Promise<Visit> {
        return this.visitModel.findByIdAndUpdate(id, visitdto, {new: true})
    }
}