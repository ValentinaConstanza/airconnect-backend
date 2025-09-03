import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateVueloDto } from './create-vuelo.dto';

export class UpdateEstadoVueloDto {
    @ApiProperty({
  description: 'Estado del vuelo',
  example: 'Programado',
})
    estado:string;
}
