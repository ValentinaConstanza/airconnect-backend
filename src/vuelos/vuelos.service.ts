import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVueloDto } from './dto/create-vuelo.dto';
import { UpdateEstadoVueloDto } from './dto/update-vuelo.dto';
import { Vuelo } from './entities/vuelo.entity';
import { AeropuertosService } from 'src/aeropuertos/aeropuertos.service';

@Injectable()
export class VuelosService {
  vuelos: Vuelo[] = []

  constructor(
    private readonly aeropuertoService: AeropuertosService
  ) {
    this.inicializarVuelos();
  }

  inicializarVuelos() {
    const santiagoInternacional = this.aeropuertoService.findOne(1)
    const guarulosInternacional = this.aeropuertoService.findOne(2)

    this.vuelos.push(
      new Vuelo(1, "LA401", new Date(`2025-10-11`), 120, santiagoInternacional, guarulosInternacional, "Programado")
    )
  }

  //crear vuelo
  create(createVueloDto: CreateVueloDto): Vuelo {
    const origenExiste = this.aeropuertoService.existsByCodigo(createVueloDto.origen);
    const destinoExiste = this.aeropuertoService.existsByCodigo(createVueloDto.destino)

    if (!origenExiste || !destinoExiste) {
      throw new NotFoundException(`El aeropuerto de ${!origenExiste ? 'origen' : 'destino'} no existe`);
    }
    const nuevoVuelo = new Vuelo(
      this.vuelos.length + 1,
      createVueloDto.numeroVuelo,
      createVueloDto.fechaSalida,
      createVueloDto.duracionEstimada,
      origenExiste,
      destinoExiste,
      createVueloDto.estado,
    )
    this.vuelos.push(nuevoVuelo);
    return nuevoVuelo;
  }

  //mostrar todos o filtrar por origen/estado
  findAll(origen?: string, estado?: string): Vuelo[] {
    let informacion = this.vuelos;

    if (origen) {
      informacion = informacion.filter(v => v.origen.codigo === origen);
    }
    if (estado) {
      informacion = informacion.filter(v => v.estado === estado);
    }

    return informacion;
  }

  //filtrar por id
  findOne(id: number): Vuelo {
    const vueloId = this.vuelos.find(v => v.id === id);
    if (!vueloId) {
      throw new NotFoundException(`No existe un vuelo registrado con id ${id}`);
    }
    return vueloId;
  }

  //modificar estado segun id.
  update(id: number, dto: UpdateEstadoVueloDto) {
    const vueloModificado = this.vuelos.find(v => v.id === id);
    if (!vueloModificado) {
      throw new NotFoundException(`No existe un vuelo con id ${id}`);
    }
    vueloModificado.estado = dto.estado;
    return vueloModificado;
  }
}
