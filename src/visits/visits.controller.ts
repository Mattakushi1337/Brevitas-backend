import { Body, Controller, Delete, Get, Post, Param, Put, UseGuards} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ExistingUserDto } from 'src/user/dtos/existing-user.dto';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Visit } from './shemas/visits.schemas';
import { VisitsService } from './visits.service';

@Controller('visits')
export class VisitsController {


    constructor(private readonly VisitsService: VisitsService) {
    }



    @Get()
    
    getAll(): Promise<Visit[]> {
        return this.VisitsService.getAll() // Получаем все визитки
    }


    @Get(':id')
    
    getOne(@Param('id') id: string): Promise<Visit> {
        
        return this.VisitsService.getById(id) // ищем определённую визитку

    }


    @Post()
   
    create(@Body() createVisitDto: CreateVisitDto): Promise<Visit> {
        return this.VisitsService.create(createVisitDto) // создаём
    }
    
    @Delete(':id')
   
    remove(@Param('id') id: string): Promise<Visit> {
        return this.VisitsService.remove(id) // удаляем
    }

    @Put(':id')
    
    update(@Body() updateVisitDto: UpdateVisitDto, @Param('id') id: string): Promise<Visit> {
        return this.VisitsService.update(id, updateVisitDto) // обновляем
    }



}


