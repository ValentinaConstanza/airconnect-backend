import { ApiProperty } from "@nestjs/swagger";

export class CreatePasajeroDto {

    @ApiProperty()
    public nombre: string;
    @ApiProperty()
    public apellido: string;
    @ApiProperty()
    public email: string;
}
