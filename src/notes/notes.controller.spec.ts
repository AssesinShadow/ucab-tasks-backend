import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { QueryNotesDto } from './dto/query-notes.dto';

describe('NotesController', () => {
    let controller: NotesController;
    let service: NotesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [NotesController],
            providers: [
                {
                    provide: NotesService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<NotesController>(NotesController);
        service = module.get<NotesService>(NotesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call service.create with dto', async () => {
            const dto: CreateNoteDto = { title: 'T', content: 'C' };
            await controller.create(dto);
            expect(service.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findAll', () => {
        it('should call service.findAll with query dto', async () => {
            const query: QueryNotesDto = {};
            await controller.findAll(query);
            expect(service.findAll).toHaveBeenCalledWith(query);
        });
    });

    describe('findOne', () => {
        it('should call service.findOne with id', async () => {
            const id = '123';
            await controller.findOne(id);
            expect(service.findOne).toHaveBeenCalledWith(id);
        });
    });

    describe('update', () => {
        it('should call service.update with id and dto', async () => {
            const id = '123';
            const dto: UpdateNoteDto = { title: 'New' };
            await controller.update(id, dto);
            expect(service.update).toHaveBeenCalledWith(id, dto);
        });
    });

    describe('remove', () => {
        it('should call service.remove with ids', async () => {
            const body = { ids: ['1', '2'] };
            await controller.remove(body);
            expect(service.remove).toHaveBeenCalledWith(body.ids);
        });
    });
});
