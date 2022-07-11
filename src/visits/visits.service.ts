import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { User, UserDocument } from 'src/user/user.schema';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Visit, VisitDocument } from './shemas/visits.schemas';

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit.name) private visitModel: Model<VisitDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async getAll(req: RequestWithUser): Promise<Visit[]> {
    const result = await this.visitModel.find({user: req.user})
    
    return result
  }

  async getById(id: string): Promise<Visit> {
    try {
      const isVisitExist = await this.visitModel.findById(id).exec()
      return isVisitExist
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }


  async create(visitdto: CreateVisitDto, user: User) {
    try {
      const newVisit = new this.visitModel({
        ...visitdto,
        user,
      })
      return await newVisit.save();
    } catch (error) {
      throw new HttpException('Not Acceptable', HttpStatus.NOT_ACCEPTABLE)
    }
  }

  async remove(id: string): Promise<Visit> {
    try {
      const isVisitExist = await this.visitModel.findById(id).exec()
      return await this.visitModel.findByIdAndRemove(id)
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: string, visitdto: UpdateVisitDto): Promise<Visit> {
    try {
      const isVisitExist = await this.visitModel.findById(id).exec()
      return await this.visitModel.findByIdAndUpdate(id, visitdto, { new: true, })
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }
}
