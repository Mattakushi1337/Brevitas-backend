import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/user.schema";
import { CreateVisitDto } from "./dto/create-visit.dto";
import { UpdateVisitDto } from "./dto/update-visit.dto";
import { Visit, VisitDocument } from "./shemas/visits.schemas";



@Injectable()
export class VisitsService {


    constructor(@InjectModel(Visit.name) private visitModel: Model<VisitDocument>) { }

    async getAll(): Promise<Visit[]> {
        return await this.visitModel.find().populate('user')
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


    async create(visitdto: CreateVisitDto, user: User) {
        const newVisit = new this.visitModel({
            ...visitdto,
            user,
        })
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


