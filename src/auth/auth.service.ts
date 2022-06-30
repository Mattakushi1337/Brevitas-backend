import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ExistingUserDto } from 'src/user/dtos/existing-user.dto';
import { NewUserDto } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private UserService: UserService, private jwtService: JwtService) {}

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12)
    }

    async register(user: Readonly<NewUserDto>): Promise<UserDetails | any> {
        const { email, login, password} = user
        const existingUser = await this.UserService.findByEmail(email)
        const loginUser = await this.UserService.findByLogin(login)


        if (existingUser) {
            throw new HttpException('Email Taken!', HttpStatus.FORBIDDEN);
        }

        if (loginUser) {
            throw new HttpException('Login Taken!', HttpStatus.FORBIDDEN);
        }
        
        const hashedPassword = await this.hashPassword(password)

        const newUser = await this.UserService.create(email, login, hashedPassword)
        

        // TODO: Fix as in user service
        return this.UserService._getUserDetails(newUser)
    }

    async doesPasswordMath(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword)
    }

    async validateUser(login: string, password: string): Promise<UserDetails | null> {
        const user = await this.UserService.findByLogin(login)
        const doesUserExist = !!user

        if (!doesUserExist) {
            throw new HttpException('Uncorrect Login', HttpStatus.FORBIDDEN);
        }

        const doesPasswordMath = await this.doesPasswordMath(password, user.password)

        if (!doesPasswordMath) {
            throw new HttpException('Uncorrect password', HttpStatus.FORBIDDEN);
        }

        // TODO: Fix as in user service
        return this.UserService._getUserDetails(user)
    }
    async login(existingUser: ExistingUserDto): Promise<{token: string} | null> {
        const {login, password} = existingUser
        const user = await this.validateUser(login, password)

        if (!user) return null

        const jwt = await this.jwtService.signAsync({ user })
        return { token: jwt }
    }
}
