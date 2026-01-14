import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from '../schemas/note.schema';
import { NotesRepository } from '../interfaces/notes-repository.interface';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';

@Injectable()
export class MongoNotesRepository implements NotesRepository {
  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async findById(id: string): Promise<Note | null> {
    return this.noteModel.findById(id).exec();
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note | null> {
    return this.noteModel.findByIdAndUpdate(
      id, 
      { ...updateNoteDto, updatedAt: new Date() },
      { new: true } // Devuelve el documento actualizado
    ).exec();
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.noteModel.deleteMany({ _id: { $in: ids } }).exec();
  }
}