import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserDto } from './dtos/new-user.dto';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

    async getByEmail(email: string) {
        const user = await this.userModel.findOne({ email });
        if (user) {
            return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({ email }).exec()
    }

    async findByLogin(login: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({ login }).exec()
    }

    async getById(id: string) {
        const user = await this.userModel.findOne({_id:id})
        if (user) {
            return user
        }
        throw new HttpException('User with this ID does not exist', HttpStatus.NOT_FOUND)
    }

    async create(newUserDto: NewUserDto): Promise<UserDocument> {
        const newUser = new this.userModel(newUserDto)
        return await newUser.save()
    }

    
}
