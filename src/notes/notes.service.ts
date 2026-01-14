import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { FilterNoteDto, SortBy } from './dto/filter-note.dto';
import type { NotesRepository } from './interfaces/notes-repository.interface';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTES_REPOSITORY')
    private readonly notesRepository: NotesRepository,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    return this.notesRepository.create(createNoteDto);
  }

  async findAll(filters?: FilterNoteDto) {
    const notes = await this.notesRepository.findAll();
    
    // Aplicar filtros si existen
    let filteredNotes = [...notes];
    
    if (filters?.sortBy) {
      filteredNotes.sort((a, b) => {
        const aValue = a[filters.sortBy as SortBy];
        const bValue = b[filters.sortBy as SortBy];
        
        if (filters.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }
    
    // Excluir contenido en el listado general (según requisitos)
    return filteredNotes.map((note) => {
      const noteObj = note instanceof Object && note['toObject'] ? note['toObject']() : note;
      const { content, ...rest } = noteObj; 
      return rest;
    });
  }

  async findOne(id: string) {
    const note = await this.notesRepository.findById(id);
    if (!note) {
      throw new NotFoundException(`La nota con id #${id} no existe`);
    }
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const updatedNote = await this.notesRepository.update(id, updateNoteDto);
    if (!updatedNote) {
      throw new NotFoundException(`La nota con id #${id} no existe`);
    }
    return updatedNote;
  }

  async remove(ids: string[]) {
    if (!ids || ids.length === 0) {
      throw new NotFoundException('No se proporcionaron IDs para eliminar');
    }
    return this.notesRepository.deleteMany(ids);
  }
}