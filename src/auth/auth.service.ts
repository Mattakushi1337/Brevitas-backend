import { Injectable } from '@nestjs/common';
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
        const {username, email, password} = user
        const existingUser = await this.UserService.findByEmail(email)

        if (existingUser) return 'Email taken!'
        
        const hashedPassword = await this.hashPassword(password)

        const newUser = await this.UserService.create(username, email, hashedPassword)
        
        return this.UserService._getUserDetails(newUser)
    }

    async doesPasswordMath(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword)
    }

    async validateUser(email: string, password: string): Promise<UserDetails | null> {
        const user = await this.UserService.findByEmail(email)
        const doesUserExist = !!user

        if (!doesUserExist) return null

        const doesPasswordMath = await this.doesPasswordMath(password, user.password)

        if (!doesPasswordMath) return null

        return this.UserService._getUserDetails(user)
    }
    async login(existingUser: ExistingUserDto): Promise<{token: string} | null> {
        const {email, password} = existingUser
        const user = await this.validateUser(email, password)

        if (!user) return null

        const jwt = await this.jwtService.signAsync({ user })
        return { token: jwt }
    }
}
