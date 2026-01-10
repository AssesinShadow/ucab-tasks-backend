import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // <--- 1. Importar esto
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    // 2. Configurar la conexión a tu base de datos local
    MongooseModule.forRoot('mongodb://localhost:27017/ucab-tasks'), 
    
    NotesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
