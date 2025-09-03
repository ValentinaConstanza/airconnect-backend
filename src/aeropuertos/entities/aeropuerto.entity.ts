import { ApiProperty } from "@nestjs/swagger";

export class Aeropuerto {
    constructor (
        public id: number,
        public nombre: string,
        public codigo: string,
        public ciudad: string
    ){}
}
