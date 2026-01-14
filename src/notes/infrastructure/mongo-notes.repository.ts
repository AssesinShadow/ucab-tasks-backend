import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from '../schemas/note.schema';
import { NotesRepository } from '../interfaces/notes-repository.interface';
import { SortField, SortOrder } from '../dto/query-notes.dto';

/**
 * Implementación del repositorio de notas usando MongoDB
 * 
 * Esta clase implementa la interfaz NotesRepository usando Mongoose
 * para interactuar con MongoDB. Si en el futuro se necesita cambiar
 * la fuente de datos, solo se crea una nueva implementación de la interfaz.
 * 
 * @class MongoNotesRepository
 * @implements {NotesRepository}
 */
@Injectable()
export class MongoNotesRepository implements NotesRepository {
  constructor(@InjectModel(Note.name) private readonly noteModel: Model<Note>) {}

  /**
   * Obtiene todas las notas con opciones de ordenamiento
   * @param {SortField} sortBy - Campo por el cual ordenar
   * @param {SortOrder} order - Orden (ascendente o descendente)
   * @returns {Promise<Note[]>} Lista de notas ordenadas
   */
  async findAll(sortBy?: SortField, order?: SortOrder): Promise<Note[]> {
    const query = this.noteModel.find();
    
    // Si se especifica un campo de ordenamiento, aplicarlo
    if (sortBy) {
      const sortOrder = order === SortOrder.DESC ? -1 : 1;
      query.sort({ [sortBy]: sortOrder });
    }
    
    return query.exec();
  }

  async findById(id: string): Promise<Note | null> {
    // Si no lo encuentra, devuelve null sin lanzar error (eso lo maneja el servicio)
    return this.noteModel.findById(id).exec();
  }

  async create(note: any): Promise<Note> {
    const createdNote = new this.noteModel(note);
    return createdNote.save();
  }

  async update(id: string, note: any): Promise<Note | null> {
    // { new: true } es vital para que devuelva el objeto YA editado
    return this.noteModel.findByIdAndUpdate(id, note, { new: true }).exec();
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.noteModel.deleteMany({ _id: { $in: ids } }).exec();
  }
}