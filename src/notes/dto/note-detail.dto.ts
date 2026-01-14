import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para representar una nota completa en búsqueda específica
 * 
 * Este DTO se usa en el endpoint de búsqueda específica que retorna
 * una nota completa INCLUYENDO el contenido, según los requerimientos.
 * 
 * @class NoteDetailDto
 */
export class NoteDetailDto {
  /**
   * Identificador único de la nota
   * @type {string}
   * @example "507f1f77bcf86cd799439011"
   */
  @ApiProperty({
    description: 'Identificador único de la nota',
    example: '507f1f77bcf86cd799439011'
  })
  _id: string;

  /**
   * Título de la nota
   * @type {string}
   * @example "Comprar víveres"
   */
  @ApiProperty({
    description: 'Título de la nota',
    example: 'Comprar víveres'
  })
  title: string;

  /**
   * Contenido detallado de la nota
   * @type {string}
   * @example "Leche, huevos, pan y café."
   */
  @ApiProperty({
    description: 'Contenido detallado de la nota',
    example: 'Leche, huevos, pan y café.'
  })
  content: string;

  /**
   * Fecha de creación de la nota
   * @type {Date}
   * @example "2026-01-12T10:30:00.000Z"
   */
  @ApiProperty({
    description: 'Fecha en que se creó la nota',
    example: '2026-01-12T10:30:00.000Z'
  })
  createdAt: Date;

  /**
   * Fecha de última modificación de la nota
   * @type {Date}
   * @example "2026-01-12T15:45:00.000Z"
   */
  @ApiProperty({
    description: 'Fecha de la última modificación de la nota',
    example: '2026-01-12T15:45:00.000Z'
  })
  updatedAt: Date;
}

