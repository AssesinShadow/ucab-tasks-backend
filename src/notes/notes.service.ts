import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { QueryNotesDto, SortOrder } from './dto/query-notes.dto';
import type { NotesRepository } from './interfaces/notes-repository.interface';

/**
 * Servicio de gestión de notas
 * 
 * Contiene la logica de negocio para las operaciones CRUD de notas
 * Implementa los requerimientos funcionales:
 * - creación de notas con fechas automáticas
 * - listado general sin contenido (con filtros y ordenamiento)
 * - búsqueda específica con contenido completo
 * - actualización automática de fecha de modificación
 * 
 * @class NotesService
 */
@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTES_REPOSITORY')
    private readonly notesRepository: NotesRepository,
  ) { }

  /**
   * crea una nueva nota
   * 
   * la fecha de creación y modificación se generan automáticamente
   * por MongoDB gracias al esquema con timestamps.
   * 
   * @param {CreateNoteDto} createNoteDto - Datos de la nota a crear
   * @returns {Promise<any>} La nota creada con todos sus datos
   */
  async create(createNoteDto: CreateNoteDto) {
    return this.notesRepository.create(createNoteDto);
  }

  /**
   * Obtiene el listado general de todas las notas
   * 
   * Permite ordenar por título, fecha de creación o fecha de modificación.
   * Retorna las notas sin contenido según requerimientos.
   * 
   * @param {QueryNotesDto} queryDto - Parámetros de consulta para ordenamiento
   * @returns {Promise<any[]>} Lista de notas sin contenido
   */
  async findAll(queryDto?: QueryNotesDto) {
    const sortBy = queryDto?.sortBy;
    const order = queryDto?.order || SortOrder.ASC;

    const notes = await this.notesRepository.findAll(sortBy, order);

    // Retornar sin contenido según requerimientos
    return notes.map((note) => {
      const noteObj = (note as any).toObject ? (note as any).toObject() : note;
      const { content, ...rest } = noteObj;
      return rest;
    });
  }

  /**
   * Busca una nota específica por su identificador único
   * 
   * Según los requerimientos, este endpoint retorna la nota completa
   * INCLUYENDO el contenido.
   * 
   * @param {string} id - Identificador único de la nota
   * @returns {Promise<any>} La nota completa con todos sus datos
   * @throws {NotFoundException} Si la nota no existe
   */
  async findOne(id: string) {
    const note = await this.notesRepository.findById(id);
    if (!note) {
      throw new NotFoundException(`La nota con id #${id} no existe`);
    }
    return note;
  }

  /**
   * Actualiza una nota existente
   * 
   * Solo permite actualizar título y contenido según requerimientos.
   * La fecha de modificación se actualiza automáticamente por MongoDB.
   * 
   * @param {string} id - Identificador único de la nota
   * @param {UpdateNoteDto} updateNoteDto - Datos a actualizar (solo título y/o contenido)
   * @returns {Promise<any>} La nota actualizada
   * @throws {NotFoundException} Si la nota no existe
   */
  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const updatedNote = await this.notesRepository.update(id, updateNoteDto);
    if (!updatedNote) {
      throw new NotFoundException(`La nota con id #${id} no existe`);
    }
    return updatedNote;
  }

  /**
   * Elimina una o más notas por sus identificadores
   * 
   * Según los requerimientos, el endpoint debe aceptar uno o más
   * identificadores únicos.
   * 
   * @param {string[]} ids - Array de identificadores únicos a eliminar
   * @returns {Promise<any>} Confirmación de eliminación
   * @throws {NotFoundException} Si no se proporcionan IDs
   */
  async remove(ids: string[]) {
    if (!ids || ids.length === 0) {
      throw new NotFoundException('No se proporcionaron IDs para eliminar');
    }
    return this.notesRepository.deleteMany(ids);
  }
}

