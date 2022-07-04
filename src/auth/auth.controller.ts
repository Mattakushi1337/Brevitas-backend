import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { SwaggerModule, DocumentBuilder, ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ExistingUserDto } from 'src/user/dtos/existing-user.dto';
import { NewUserDto } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';
import { JwtGuard } from './guards/jwt.guard';



@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) { }


    @Post('register')
    @ApiBody({ type: NewUserDto })
    @ApiResponse({ status: 200, description: 'Регистрация' })
    async register(@Body() user: NewUserDto) {
        return await this.authService.register(user)
    }


    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: ExistingUserDto })
    @UseGuards(LocalAuthenticationGuard)
    @ApiResponse({ status: 200, description: 'Авторизация' })
    async login(
        @Req() request: RequestWithUser,
        @Res({ passthrough: true }
        ) response: Response) {
            
        const { user } = request;
        
        const cookie = await this.authService.getCookieWithJwtToken(user._id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return user;
    }

    @UseGuards(JwtGuard)
    @Post('logout')
    async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
