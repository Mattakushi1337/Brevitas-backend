import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
    FindByLogin(login: string) {
        throw new Error('Method not implemented.');
    }
    findOne(email: string) {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

    _getUserDetails(username: UserDocument): UserDetails {
        return {
            id: username._id,
            login: username.login,
            email: username.email,
        }
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({email}).exec()
    }

    async findByLogin(login: string): Promise<UserDocument | null> {
        return this.userModel.findOne({login}).exec()
    }

    async findById(id: string): Promise<UserDetails | null> {
        const user = await this.userModel.findById(id).exec()
        if (!user) return null
        return this._getUserDetails(user)
    }

    async create(email: string, login: string, hashedPassword: string): Promise<UserDocument> {
        const newUser = new this.userModel({email, login, password: hashedPassword})
        return newUser.save()
    }
}
