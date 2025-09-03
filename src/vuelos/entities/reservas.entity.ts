import { Pasajero } from "src/pasajeros/entities/pasajero.entity";
import { Vuelo } from "src/vuelos/entities/vuelo.entity";

export class Reserva {

    constructor(
        public id: number,
        public codigoReserva: string,
        public fechaReserva: Date,
        public estado: string,
        public pasajero: Pasajero,
        public vuelo: Vuelo
    ) {}
}