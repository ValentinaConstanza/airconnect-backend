import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservaDto {
  @ApiProperty({ description: 'Nuevo estado de la reserva' })
  estado: string;
}