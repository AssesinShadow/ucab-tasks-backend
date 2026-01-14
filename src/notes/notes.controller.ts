import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody
} from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { QueryNotesDto } from './dto/query-notes.dto';
import { NoteListItemDto } from './dto/note-list-item.dto';
import { NoteDetailDto } from './dto/note-detail.dto';

/**
 * Controlador REST para la gestion de notas
 * 
 * Implementa los endpoints CRUD según los requerimientos funcionales:
 * - POST /notes: Crear una nueva nota
 * - GET /notes: Listado general (sin contenido) con filtros y ordenamiento
 * - GET /notes/:id: Búsqueda específica (con contenido completo)
 * - PATCH /notes/:id: Actualizar una nota (solo título y contenido)
 * - DELETE /notes: Eliminar una o más notas
 * 
 * @class NotesController
 */
@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  /**
   * Crea una nueva nota
   * 
   * @param {CreateNoteDto} createNoteDto - Datos de la nota a crear
   * @returns {Promise<any>} La nota creada
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear una nueva nota',
    description: 'Crea una nueva nota con título y contenido. Las fechas de creación y modificación se generan automáticamente.'
  })
  @ApiResponse({
    status: 201,
    description: 'Nota creada exitosamente',
    type: NoteDetailDto
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos. El título y contenido son requeridos.'
  })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  /**
   * Obtiene el listado general de todas las notas
   * 
   * Retorna todas las notas SIN incluir el contenido.
   * Permite ordenar por título, fecha de creación o fecha de modificación.
   * 
   * @param {QueryNotesDto} queryDto - Parámetros de consulta para filtrado y ordenamiento
   * @returns {Promise<any[]>} Lista de notas sin contenido
   */
  @Get()
  @ApiOperation({
    summary: 'Obtener listado general de notas',
    description: 'Retorna todas las notas sin incluir el contenido. Permite ordenar por título (alfabéticamente), fecha de creación o fecha de modificación.'
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['title', 'createdAt', 'updatedAt'],
    description: 'Campo por el cual ordenar las notas'
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Orden de clasificación (ascendente o descendente)',
    example: 'asc'
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de notas obtenido exitosamente',
    type: [NoteListItemDto]
  })
  findAll(@Query() queryDto: QueryNotesDto) {
    return this.notesService.findAll(queryDto);
  }

  /**
   * Busca una nota específica por su identificador único
   * 
   * Retorna la nota completa INCLUYENDO el contenido.
   * 
   * @param {string} id - Identificador único de la nota
   * @returns {Promise<any>} La nota completa con todos sus datos
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Buscar una nota específica',
    description: 'Retorna una nota completa por su identificador único, incluyendo el contenido.'
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la nota',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({
    status: 200,
    description: 'Nota encontrada exitosamente',
    type: NoteDetailDto
  })
  @ApiResponse({
    status: 404,
    description: 'La nota con el ID especificado no existe'
  })
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  /**
   * Actualiza una nota existente
   * 
   * Solo permite actualizar el título y/o contenido.
   * La fecha de modificación se actualiza automáticamente.
   * 
   * @param {string} id - Identificador único de la nota
   * @param {UpdateNoteDto} updateNoteDto - Datos a actualizar (solo título y/o contenido)
   * @returns {Promise<any>} La nota actualizada
   */
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una nota',
    description: 'Actualiza el título y/o contenido de una nota. Solo estos campos son editables. La fecha de modificación se actualiza automáticamente.'
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la nota a actualizar',
    example: '507f1f77bcf86cd799439011'
  })
  @ApiResponse({
    status: 200,
    description: 'Nota actualizada exitosamente',
    type: NoteDetailDto
  })
  @ApiResponse({
    status: 400,
    description: 'Intento de actualizar campos no permitidos'
  })
  @ApiResponse({
    status: 404,
    description: 'La nota con el ID especificado no existe'
  })
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto
  ) {
    return this.notesService.update(id, updateNoteDto);
  }

  /**
   * Elimina una o más notas
   * 
   * Acepta uno o más identificadores únicos en el cuerpo de la petición.
   * 
   * @param {string[]} ids - Array de identificadores únicos a eliminar
   * @returns {Promise<any>} Confirmación de eliminación
   */
  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Eliminar una o más notas',
    description: 'Elimina una o más notas proporcionando sus identificadores únicos en un array.'
  })
  @ApiBody({
    description: 'Array de identificadores únicos de las notas a eliminar',
    schema: {
      type: 'object',
      properties: {
        ids: {
          type: 'array',
          items: { type: 'string' },
          example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
          description: 'Array de IDs de las notas a eliminar'
        }
      },
      required: ['ids']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Nota(s) eliminada(s) exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Se eliminaron 2 nota(s) exitosamente' },
        deletedCount: { type: 'number', example: 2 }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'No se proporcionaron IDs para eliminar'
  })
  remove(@Body() body: { ids: string[] }) {
    return this.notesService.remove(body.ids);
  }
}