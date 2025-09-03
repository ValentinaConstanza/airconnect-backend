import { ApiProperty } from "@nestjs/swagger"

export class CreateAeropuertoDto {
   
    @ApiProperty()
    public nombre: string;
    @ApiProperty()
    public codigo: string;
    @ApiProperty()
    public ciudad: string;

}
