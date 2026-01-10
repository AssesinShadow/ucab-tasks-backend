import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // <--- Importante
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

// Asegúrate de que estas rutas sean correctas según tu estructura de carpetas:
import { Note, NoteSchema } from './schemas/note.schema';
import { MongoNotesRepository } from './infrastructure/mongo-notes.repository';

@Module({
  imports: [
    // Registramos el esquema para que Mongoose lo reconozca
    MongooseModule.forFeature([
      { name: Note.name, schema: NoteSchema }
    ]),
  ],
  controllers: [NotesController],
  providers: [
    NotesService,
    // Aquí definimos que cuando alguien pida 'NOTES_REPOSITORY',
    // NestJS le entregue la clase MongoNotesRepository.
    {
      provide: 'NOTES_REPOSITORY',
      useClass: MongoNotesRepository,
    },
  ],
  exports: [NotesService], // Exportamos el servicio por si acaso
})
export class NotesModule {}