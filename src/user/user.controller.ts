import { Controller, Get, Param } from '@nestjs/common';
import { UserDetails } from './user-details.interface';
import { UserService } from './user.service';
import { SwaggerModule, DocumentBuilder, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Получение пользователя по ID')
@Controller('user')
export class UserController {

    constructor(private UserService: UserService) {}

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Получение пользователя по ID'})
    getUser(@Param('id') id: string): Promise<UserDetails | null> {
        return this.UserService.findById(id) 
    }
}
