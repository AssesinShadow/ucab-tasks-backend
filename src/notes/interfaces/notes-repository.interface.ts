import { Note } from '../schemas/note.schema';
import { SortField, SortOrder } from '../dto/query-notes.dto';

/**
 * Interfaz del repositorio de notas
 * 
 * Define el contrato que debe cumplir cualquier implementación
 * del repositorio, permitiendo cambiar la fuente de datos sin
 * afectar la lógica de negocio (patrón Repository).
 * 
 * @interface NotesRepository
 */
export interface NotesRepository {
  /**
   * Crea una nueva nota
   * @param {any} note - Datos de la nota a crear
   * @returns {Promise<Note>} La nota creada
   */
  create(note: any): Promise<Note>;

  /**
   * Obtiene todas las notas con opciones de ordenamiento
   * @param {SortField} sortBy - Campo por el cual ordenar
   * @param {SortOrder} order - Orden (ascendente o descendente)
   * @returns {Promise<Note[]>} Lista de notas
   */
  findAll(sortBy?: SortField, order?: SortOrder): Promise<Note[]>;

  /**
   * Busca una nota por su identificador único
   * @param {string} id - Identificador único de la nota
   * @returns {Promise<Note | null>} La nota encontrada o null si no existe
   */
  findById(id: string): Promise<Note | null>;

  /**
   * Actualiza una nota existente
   * @param {string} id - Identificador único de la nota
   * @param {any} note - Datos a actualizar
   * @returns {Promise<Note | null>} La nota actualizada o null si no existe
   */
  update(id: string, note: any): Promise<Note | null>;

  /**
   * Elimina una o más notas por sus identificadores
   * @param {string[]} ids - Array de identificadores únicos
   * @returns {Promise<void>}
   */
  deleteMany(ids: string[]): Promise<void>;
}