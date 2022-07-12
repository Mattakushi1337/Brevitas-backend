import { Body, Controller, Delete, Get, Post, Param, Put, UseGuards, Req } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Visit } from './shemas/visits.schemas';
import { VisitsService } from './visits.service';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import RequestWithUser from 'src/auth/requestWithUser.interface';


@ApiTags('Work with visits')
@Controller('visits')
export class VisitsController {


    constructor(private readonly VisitsService: VisitsService) { }


    @Get()
    @UseGuards(JwtGuard)
    @ApiResponse({ status: 200, description: 'Получение всех визиток' })
    async getAll(@Req() req): Promise<Visit[]> {
        return await this.VisitsService.getAll(req) // Получаем все визитки
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    @ApiResponse({ status: 200, description: 'Получение одной визитки по ID' })
    @ApiResponse({ status: 404, description: 'Не найдено' })
    async getOne(@Param('id') id: string): Promise<Visit> {
        return await this.VisitsService.getById(id) // ищем определённую визитку
    }

    @Post()
    @UseGuards(JwtGuard)
    @ApiBody({ type: CreateVisitDto })
    @ApiResponse({ status: 200, description: 'Создание визитки' })
    async create(@Body() createVisitDto: CreateVisitDto, @Req() req: RequestWithUser): Promise<Visit> {
        return await this.VisitsService.create(createVisitDto, req.user) // создаём
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    @ApiResponse({ status: 200, description: 'Удаление визитки по ID' })
    @ApiResponse({ status: 404, description: 'Не найдено' })
    async remove(@Param('id') id: string): Promise<Visit> {
        return await this.VisitsService.remove(id) // удаляем
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    @ApiBody({ type: UpdateVisitDto })
    @ApiResponse({ status: 200, description: 'Изменение визитки по ID' })
    @ApiResponse({ status: 404, description: 'Не найдено' })
    async update(@Body() updateVisitDto: UpdateVisitDto, @Param('id') id: string): Promise<Visit> {
        return await this.VisitsService.update(id, updateVisitDto) // обновляем
    }
}