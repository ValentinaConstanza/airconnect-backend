import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePasajeroDto } from './dto/create-pasajero.dto';
import { UpdatePasajeroDto } from './dto/update-pasajero.dto';
import { Pasajero } from './entities/pasajero.entity';

@Injectable()
export class PasajerosService {

  pasajeros: Pasajero[] = []

  constructor() {
    this.inicializarPasajeros();
  }

  inicializarPasajeros() {
    this.pasajeros.push(
      new Pasajero(1, "Daniela", "Troncoso", "daniela@ejemplo.cl")
    )
  }

  create(createPasajeroDto: CreatePasajeroDto) {
    const pasajeroEncontrado = this.pasajeros.find(
      (pasajero: Pasajero) =>
        pasajero.email === createPasajeroDto.email
    );
    if (pasajeroEncontrado) {
      throw new BadRequestException(`Ya existe un pasajero con este correo`)
    }
    const newPasajero = new Pasajero(
      this.pasajeros.length + 1,
      createPasajeroDto.nombre,
      createPasajeroDto.apellido,
      createPasajeroDto.email
    )
    this.pasajeros.push(newPasajero);
    return newPasajero;
  }

  findAll(): Pasajero[] {
    return this.pasajeros;
  }

  findOne(id: number) {
    const pasajeroId = this.pasajeros.find(p => p.id === id);
    if (!pasajeroId) {
      throw new NotFoundException(`No existe un pasajero registrado con id ${id}`);
    }
    return pasajeroId;
  }

  remove(id: number): void {
    const pasajeroId = this.pasajeros.find(p => p.id === id);
    if (!pasajeroId) {
      throw new NotFoundException(`No existe un pasajero registrado con id ${id}`);
    }
    for (let i = 0; i < this.pasajeros.length; i++) {
      if (this.pasajeros[i].id === id) {
        this.pasajeros.splice(i, 1);
      }
    }
  }
}
