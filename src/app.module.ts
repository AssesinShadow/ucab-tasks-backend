import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    // 2. Configurar la conexión a la base de datos local
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ucab-tasks';
        console.log('AppModule connecting to:', uri);
        return { uri };
      },
    }),

    NotesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
