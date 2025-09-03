import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAeropuertoDto } from './dto/create-aeropuerto.dto';
import { UpdateAeropuertoDto } from './dto/update-aeropuerto.dto';
import { Aeropuerto } from './entities/aeropuerto.entity';

@Injectable()
export class AeropuertosService {
  aeropuertos: Aeropuerto [] = []
  constructor() {
    this.inicializaraeropuerto();
  }
  inicializaraeropuerto () {
    this.aeropuertos.push (
      new Aeropuerto (1,"Aeropuerto de Santiago", "SCL", "Santiago")
    )
  }

  create(createAeropuertoDto: CreateAeropuertoDto) {
    const codigoEncontrado= this.aeropuertos.find(
      (aeropuerto: Aeropuerto) =>
        aeropuerto.codigo === createAeropuertoDto.codigo
    );
    if (codigoEncontrado) {
      throw new BadRequestException(`Ya existe un aeropuerto con este codigo`)
    }
    const nuevoAeropuerto = new Aeropuerto (
      this.aeropuertos.length +1,
      createAeropuertoDto.nombre,
      createAeropuertoDto.codigo,
      createAeropuertoDto.ciudad
    )
    this.aeropuertos.push(nuevoAeropuerto);
    return nuevoAeropuerto;
  }

  findAll(): Aeropuerto [] {
    return this.aeropuertos;
  }

  findOne(id: number) {
    const aeropuertoId = this.aeropuertos.find (a => a.id === id);
    if(! aeropuertoId ) {
      throw new NotFoundException(`No existe aeropuerto registrado con id ${id}`);
    }
    return aeropuertoId;
  }
}
