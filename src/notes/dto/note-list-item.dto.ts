import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para representar una nota en el listado general
 * 
 * Este DTO se usa en el endpoint de listado general que retorna
 * todas las notas SIN incluir el contenido, según los requerimientos.
 * 
 * @class NoteListItemDto
 */
export class NoteListItemDto {
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

