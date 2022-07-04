import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateVisitDto } from "./dto/create-visit.dto";
import { UpdateVisitDto } from "./dto/update-visit.dto";
import { Visit, VisitDocument } from "./shemas/visits.schemas";



@Injectable()
export class VisitsService {


    constructor(
        @InjectModel(Visit.name) private visitModel: Model<VisitDocument>,
        // private visitService: VisitsService
    ) {
    }

    async findById(id: string): Promise<VisitDocument> {
        return await this.visitModel.findOne({ id }).exec()
    }



    async getAll(): Promise<Visit[]> {
        return await this.visitModel.find().exec()
    }


    async getById(id: string): Promise<Visit> {


        try {
            const isVisitExist = await this.visitModel.findById(id).exec()

            if (!isVisitExist) {
                throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
            }
            return await this.visitModel.findById(id)
        } catch (error) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }


    }


    async create(visitdto: CreateVisitDto): Promise<Visit> {
        const newVisit = new this.visitModel(visitdto)
        return await newVisit.save()
    }


    async remove(id: string): Promise<Visit> {

        try {
            const isVisitExist = await this.visitModel.findById(id).exec()

            if (!isVisitExist) {
                throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
            }
            return await this.visitModel.findByIdAndRemove(id)
        } catch (error) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        }
    }

    async update(id: string, visitdto: UpdateVisitDto): Promise<Visit> {
        try {
            const isVisitExist = await this.visitModel.findById(id).exec()

            if (!isVisitExist) {
                throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
            }
            return await this.visitModel.findByIdAndUpdate(id, visitdto, { new: true })
        } catch (error) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        }
        
    }
}


