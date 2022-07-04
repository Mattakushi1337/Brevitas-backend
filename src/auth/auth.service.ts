import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { NewUserDto } from 'src/user/dtos/new-user.dto';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private UserService: UserService, private jwtService: JwtService, private readonly configService: ConfigService) { }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12)
    }

    async register(user: Readonly<NewUserDto>) {
        const { email, login, password } = user
        const existingUser = await this.UserService.findByEmail(email)
        const loginUser = await this.UserService.findByLogin(login)


        if (existingUser) {
            throw new HttpException('Email Taken!', HttpStatus.FORBIDDEN);
        }

        if (loginUser) {
            throw new HttpException('Login Taken!', HttpStatus.FORBIDDEN);
        }

        const hashedPassword = await this.hashPassword(password)

        return await this.UserService.create({ email, login, password: hashedPassword })

    }





    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }


    public async getAuthenticatedUser(login: string, hashedPassword: string) {
        try {
            const user = await this.UserService.findByLogin(login);

            const isPasswordMatching = await bcrypt.compare(
                hashedPassword,
                user.password
            );

            if (!isPasswordMatching) {
                throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
            }
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('Wrong login or password', HttpStatus.BAD_REQUEST);
        }
    }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}
