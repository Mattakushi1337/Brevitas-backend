import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { SwaggerModule, DocumentBuilder, ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ExistingUserDto } from 'src/user/dtos/existing-user.dto';
import { NewUserDto } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { AuthService } from './auth.service';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

             
    @Post('register')
    @ApiBody({type: NewUserDto })
    @ApiResponse({ status: 200, description: 'Регистрация'})
    register(@Body() user: NewUserDto): Promise<UserDetails | null> {
        return this.authService.register(user)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiBody({type: ExistingUserDto })
    @ApiResponse({ status: 200, description: 'Авторизация'})
    login(@Body() user: ExistingUserDto, @Req() request: Request): Promise<{token: string} | null> {
        console.log(request.cookies)
        return this.authService.login(user)
    }
}
