import { Module } from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { VuelosController } from './vuelos.controller';
import { AeropuertosService } from 'src/aeropuertos/aeropuertos.service';

@Module({
  controllers: [VuelosController],
  providers: [VuelosService, AeropuertosService],
})
export class VuelosModule {}
