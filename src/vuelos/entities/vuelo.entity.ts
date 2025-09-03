import { Aeropuerto } from "src/aeropuertos/entities/aeropuerto.entity";

export class Vuelo {

    constructor(
        public id: number, 
        public numeroVuelo: string, 
        public fechaSalida: Date,
        public duracionEstimada: number, 
        public origen: Aeropuerto,
        public destino: Aeropuerto,
        public estado: string
    ){}

}
