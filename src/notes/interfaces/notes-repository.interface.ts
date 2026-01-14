import { Note } from '../schemas/note.schema';
import { FilterNoteDto } from '../dto/filter-note.dto';

export interface NotesRepository {
  create(note: any): Promise<Note>;
  findAll(filters?: FilterNoteDto): Promise<Note[]>; // Agregar filtros
  findById(id: string): Promise<Note | null>;
  update(id: string, note: any): Promise<Note | null>;
  deleteMany(ids: string[]): Promise<void>;
}