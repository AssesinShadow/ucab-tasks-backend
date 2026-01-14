import { IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Enum para los campos por los que se puede ordenar
 */
export enum SortField {
  TITLE = 'title',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

/**
 * Enum para el orden (ascendente o descendente)
 */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * DTO para los parámetros de consulta del endpoint de listado general
 * 
 * Permite filtrar y ordenar las notas según los requerimientos:
 * - Ordenar por título (alfabéticamente)
 * - Ordenar por fecha de creación
 * - Ordenar por fecha de modificación
 * 
 * @class QueryNotesDto
 */
export class QueryNotesDto {
  /**
   * Campo por el cual ordenar las notas
   * @type {SortField}
   * @example "title"
   */
  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar las notas',
    enum: SortField,
    example: SortField.TITLE
  })
  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField;

  /**
   * Orden de clasificación (ascendente o descendente)
   * @type {SortOrder}
   * @example "asc"
   */
  @ApiPropertyOptional({
    description: 'Orden de clasificación (ascendente o descendente)',
    enum: SortOrder,
    example: SortOrder.ASC
  })
  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder;
}

