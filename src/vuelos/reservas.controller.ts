import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDTO } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('reservas')
export class ReservasController {
    constructor(private readonly reservasService: ReservasService) { }

    @Post()
    create(@Body() dto: CreateReservaDTO) {
        return this.reservasService.create(dto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reservasService.findOne(+id);
    }

    @ApiQuery({ name: 'pasajeroId', required: false })
    @Get()
    findAll(@Query('pasajeroId') pasajeroId?: string) {
        return this.reservasService.findAll(pasajeroId ? +pasajeroId : undefined);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateReservaDto) {
        return this.reservasService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reservasService.remove(+id);
    }
}
