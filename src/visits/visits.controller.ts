import { Body, Controller, Delete, Get, Post, Param, Put, UseGuards} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Visit } from './shemas/visits.schemas';
import { VisitsService } from './visits.service';

@Controller('visits')
export class VisitsController {


    constructor(private readonly VisitsService: VisitsService) {
    }



    @Get()
    @UseGuards(JwtGuard)
    getAll(): Promise<Visit[]> {
        return this.VisitsService.getAll() // Получаем все визитки
    }


    @Get(':id')
    @UseGuards(JwtGuard)
    getOne(@Param('id') id: string): Promise<Visit> {
        
        return this.VisitsService.getById(id) // ищем определённую визитку

    }


    @Post()
    @UseGuards(JwtGuard)
    create(@Body() createVisitDto: CreateVisitDto): Promise<Visit> {
        return this.VisitsService.create(createVisitDto) // создаём
    }
    
    @Delete(':id')
    @UseGuards(JwtGuard)
    remove(@Param('id') id: string): Promise<Visit> {
        return this.VisitsService.remove(id) // удаляем
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    update(@Body() updateVisitDto: UpdateVisitDto, @Param('id') id: string): Promise<Visit> {
        return this.VisitsService.update(id, updateVisitDto) // обновляем
    }



}


