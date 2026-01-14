import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { NotFoundException } from '@nestjs/common';
import { SortField, SortOrder } from './dto/query-notes.dto';

describe('NotesService', () => {
  let service: NotesService;
  let notesRepository;

  beforeEach(async () => {
    // Mock del repositorio
    notesRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      deleteMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: 'NOTES_REPOSITORY',
          useValue: notesRepository,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new note', async () => {
      const createNoteDto = { title: 'Test', content: 'Content' };
      const expectedNote = { _id: '1', ...createNoteDto, createdAt: new Date() };

      notesRepository.create.mockResolvedValue(expectedNote);

      const result = await service.create(createNoteDto);
      expect(result).toEqual(expectedNote);
      expect(notesRepository.create).toHaveBeenCalledWith(createNoteDto);
    });
  });

  describe('findAll', () => {
    it('should return notes without content', async () => {
      const notes = [
        { title: 'Note 1', content: 'Content 1' },
        { title: 'Note 2', content: 'Content 2' },
      ];
      // Simulamos que el repositorio devuelve objetos completos
      notesRepository.findAll.mockResolvedValue(notes);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[0]).not.toHaveProperty('content');
      expect(result[1]).not.toHaveProperty('content');
      expect(notesRepository.findAll).toHaveBeenCalledWith(undefined, SortOrder.ASC);
    });

    it('should call repository with sort options', async () => {
        notesRepository.findAll.mockResolvedValue([]);
        const queryDto = { sortBy: SortField.TITLE, order: SortOrder.DESC };
        
        await service.findAll(queryDto);

        expect(notesRepository.findAll).toHaveBeenCalledWith(SortField.TITLE, SortOrder.DESC);
    });
  });

  describe('findOne', () => {
    it('should return a single note with content', async () => {
      const note = { _id: '1', title: 'Test', content: 'Content' };
      notesRepository.findById.mockResolvedValue(note);

      const result = await service.findOne('1');
      expect(result).toEqual(note);
      expect(notesRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if note not found', async () => {
      notesRepository.findById.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a note', async () => {
      const updateDto = { title: 'Updated' };
      const updatedNote = { _id: '1', title: 'Updated', content: 'Content' };
      notesRepository.update.mockResolvedValue(updatedNote);

      const result = await service.update('1', updateDto);
      expect(result).toEqual(updatedNote);
      expect(notesRepository.update).toHaveBeenCalledWith('1', updateDto);
    });

    it('should throw NotFoundException if note to update not found', async () => {
      notesRepository.update.mockResolvedValue(null);

      await expect(service.update('1', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove notes', async () => {
      notesRepository.deleteMany.mockResolvedValue(undefined);

      await service.remove(['1', '2']);
      expect(notesRepository.deleteMany).toHaveBeenCalledWith(['1', '2']);
    });

    it('should throw NotFoundException if ids array is empty', async () => {
      await expect(service.remove([])).rejects.toThrow(NotFoundException);
    });
  });
});
