import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // <--- Importante

export class CreateNoteDto {
  @ApiProperty({ 
    description: 'El título de la nota', 
    example: 'Comprar víveres' 
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    description: 'El contenido detallado de la nota', 
    example: 'Leche, huevos, pan y café.' 
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
