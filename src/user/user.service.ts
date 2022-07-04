import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserDto } from './dtos/new-user.dto';
import { UserDetails } from './user-details.interface';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

    async getByEmail(email: string) {
        const user = await this.userModel.findOne({ email });
        if (user) {
          return  user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
      }
      
    async findByEmail(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({ email }).exec()
    }

    async findByLogin(login: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({ login }).exec()
    }


    // TODO: Fix returning type (Done)
    async findById(id: string) {
        const user = await this.userModel.findById(id).exec()
        if (!user) return null

        const { _id, login, email } = user

        return  { _id, login, email }
    }

    async getById(id: number) {
        const user = await this.userModel.findOne({ id })
        
        if (user) {
            return user
        }
        throw new HttpException('User with this ID does not exist', HttpStatus.NOT_FOUND)
    }

    // TODO: Why object is not DTO (Done)
    async create(newUserDto: NewUserDto): Promise<UserDocument> {
        const newUser = new this.userModel(newUserDto)
        return await newUser.save()
    }
}
