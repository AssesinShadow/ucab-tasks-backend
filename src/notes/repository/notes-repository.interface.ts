import { Note } from '../entities/note.entity';

export interface NotesRepository {
  create(note: Partial<Note>): Promise<Note>;
  findAll(filters?: any): Promise<Note[]>;
  findById(id: string): Promise<Note | null>;
  update(id: string, note: Partial<Note>): Promise<Note>;
  deleteMany(ids: string[]): Promise<void>; // Para eliminación múltiple 
}