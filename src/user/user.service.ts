import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }


    findOne(email: string) {
        throw new Error('Method not implemented.');
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec()
    }

    async findByLogin(login: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ login }).exec()
    }


    // TODO: Fix returning type
    async findById(id: string) {
        const user = await this.userModel.findById(id).exec()
        if (!user) return null

        const { _id, login, email } = user

        return { _id, login, email }
    }


    // TODO: Why object is not DTO
    async create(email: string, login: string, hashedPassword: string): Promise<UserDocument> {
        const newUser = new this.userModel({ email, login, password: hashedPassword })
        return newUser.save()
    }
}
