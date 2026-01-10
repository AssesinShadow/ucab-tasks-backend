import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from '../schemas/note.schema';
import { NotesRepository } from '../interfaces/notes-repository.interface';

@Injectable()
export class MongoNotesRepository implements NotesRepository {
  constructor(@InjectModel(Note.name) private readonly noteModel: Model<Note>) {}

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
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