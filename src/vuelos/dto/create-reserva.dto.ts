import { ApiProperty } from "@nestjs/swagger";

export class CreateReservaDTO {


    @ApiProperty()
    public codigoReserva: string;
    @ApiProperty()
    public fechaReserva: Date;
    @ApiProperty()
    public estado: string;
    @ApiProperty()
    public pasajero: string;
    @ApiProperty()
    public vuelo: string;
    
}