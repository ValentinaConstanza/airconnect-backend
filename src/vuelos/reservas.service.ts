

import { Injectable, NotFoundException, Res } from "@nestjs/common";
import { Reserva } from "src/vuelos/entities/reservas.entity";
import { VuelosService } from "./vuelos.service";
import { PasajerosService } from "src/pasajeros/pasajeros.service";
import { CreateReservaDTO } from "./dto/create-reserva.dto";
import { UpdateReservaDto } from "./dto/update-reserva.dto";





//Modificar una reserva según su id
//si no se encuentra el id debe devolver 404 y un mensaje de error
//solo debe permitir cambiar el estado

//Eliminar una reserva según su id

@Injectable()
export class ReservasService {
    reservas: Reserva[] = []
    constructor(
        private readonly vueloService: VuelosService,
        private readonly pasajeroService: PasajerosService
    ) {
        this.inicializarReservas();
    }
    inicializarReservas() {
        const psjro = this.pasajeroService.findOne(1);
        const psjero2= this.pasajeroService.findOne(2);
        const vuelo123 = this.vueloService.findOne(1);


        this.reservas.push(
            new Reserva(1, "XYZ123", new Date(`2025-09-06`), "Confirmada",psjro, vuelo123),
            new Reserva(2, "XYZ123", new Date(`2025-09-10 `),"Cancelada", psjero2, vuelo123)
        )
    }

    create(dto: CreateReservaDTO): Reserva {
    const pasajero = this.pasajeroService.findOne(Number(dto.pasajero));
    if (!pasajero) {
      throw new NotFoundException(`No existe pasajero con ese id`);
    }

    const vuelo = this.vueloService.findOne(Number(dto.vuelo));
    if (!vuelo) {
      throw new NotFoundException(`No existe vuelo con ese id`);
    }

    const nuevaReserva = new Reserva(
      this.reservas.length++,
      dto.codigoReserva,
      dto.fechaReserva,
      dto.estado,
      pasajero,
      vuelo,
    );

    this.reservas.push(nuevaReserva);
    return nuevaReserva;
  }

  findOne(id: number): Reserva {
    const reserva = this.reservas.find(r => r.id === id);
    if (!reserva) {
      throw new NotFoundException(`No existe reserva con id ${id}`);
    }
    return reserva;
  }

  findAll(pasajeroId?: number): Reserva[] {
    if (pasajeroId) {
      return this.reservas.filter(r => r.pasajero.id === pasajeroId);
    }
    return this.reservas;
  }

  update(id: number, dto: UpdateReservaDto): Reserva {
    const reserva = this.reservas.find(r => r.id === id);
    if (!reserva) {
      throw new NotFoundException(`No existe reserva con id ${id}`);
    }
    reserva.estado = dto.estado; 
    return reserva;
  }

  remove(id: number): void {
    const reservaId = this.reservas.find(r => r.id === id);
    if (!reservaId) {
      throw new NotFoundException(`No existe una reserva registrada con id ${id}`);
    }
    for (let i = 0; i < this.reservas.length; i++) {
      if (this.reservas[i].id === id) {
        this.reservas.splice(i, 1);
      }
    }
  }
}