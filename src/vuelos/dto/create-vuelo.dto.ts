import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateVueloDto {

    @ApiProperty()
    public numeroVuelo: string;
    @ApiProperty()
    public fechaSalida: Date;
    @ApiProperty()
    public duracionEstimada: number;
    @ApiProperty()
    public origen: string;
    @ApiProperty()
    public destino: string;
    @ApiProperty()
    public estado: string;

}
