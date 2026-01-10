import { Note } from '../schemas/note.schema';

export interface NotesRepository {
  create(note: any): Promise<Note>;
  findAll(): Promise<Note[]>;
  // Agregamos "| null" porque a veces no encuentra la nota
  findById(id: string): Promise<Note | null>; 
  update(id: string, note: any): Promise<Note | null>;
  deleteMany(ids: string[]): Promise<void>;
}