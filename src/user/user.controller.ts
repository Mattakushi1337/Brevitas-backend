import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Получение пользователя по ID')
@Controller('user')
export class UserController {

    constructor(private UserService: UserService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Получение пользователя по ID' })
    getUser(@Param('id') id: string) {
        return this.UserService.findById(id)    
    }
}
