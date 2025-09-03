import { Module } from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { VuelosController } from './vuelos.controller';
import { AeropuertosService } from 'src/aeropuertos/aeropuertos.service';
import { PasajerosService } from 'src/pasajeros/pasajeros.service';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';

@Module({
  controllers: [VuelosController, ReservasController],
  providers: [VuelosService, AeropuertosService, PasajerosService, VuelosService, ReservasService],
})
export class VuelosModule {}
