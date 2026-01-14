import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('NotesController (e2e)', () => {
    let app: INestApplication;
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        // 1. Iniciar servidor MongoDB en memoria
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        process.env.MONGO_URI = uri;

        jest.setTimeout(60000); // Aumentar timeout para conexión a BD

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        // Configuración idéntica a main.ts
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }));

        await app.init();
    });

    afterAll(async () => {
        // Limpieza final
        await mongoose.connection.close();
        await app.close();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        jest.setTimeout(60000); // Aumentar timeout para conexión a BD
        // Asegurar conexión y limpiar
        // console.log('DB ReadyState:', mongoose.connection.readyState);
        if (mongoose.connection.readyState !== 1) {
            // await new Promise(resolve => setTimeout(resolve, 100));
        }
        await mongoose.connection.collection('notes').deleteMany({});
    });

    it('/notes (POST) - should create a note', () => {
        return request(app.getHttpServer())
            .post('/notes')
            .send({
                title: 'E2E Note',
                content: 'Content for E2E'
            })
            .expect(201)
            .expect((res) => {
                expect(res.body).toHaveProperty('_id');
                expect(res.body.title).toBe('E2E Note');
                expect(res.body.content).toBe('Content for E2E');
                expect(res.body).toHaveProperty('createdAt');
                expect(res.body).toHaveProperty('updatedAt');
            });
    });

    it('/notes (GET) - should return list without content', async () => {
        // 1. Crear una nota primero
        await request(app.getHttpServer())
            .post('/notes')
            .send({ title: 'Note 1', content: 'Secret Content' });

        // 2. Obtener lista
        return request(app.getHttpServer())
            .get('/notes')
            .expect(200)
            .expect((res) => {
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body.length).toBe(1);
                expect(res.body[0].title).toBe('Note 1');
                // Verificación clave: NO debe tener content
                expect(res.body[0]).not.toHaveProperty('content');
            });
    });

    it('/notes/:id (GET) - should return full note with content', async () => {
        const createRes = await request(app.getHttpServer())
            .post('/notes')
            .send({ title: 'Detail Note', content: 'Detailed Content' });

        const id = createRes.body._id;

        return request(app.getHttpServer())
            .get(`/notes/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.title).toBe('Detail Note');
                // Verificación clave: SÍ debe tener content
                expect(res.body.content).toBe('Detailed Content');
            });
    });

    it('/notes/:id (PATCH) - should update title', async () => {
        const createRes = await request(app.getHttpServer())
            .post('/notes')
            .send({ title: 'Old Title', content: 'Content' });

        const id = createRes.body._id;

        return request(app.getHttpServer())
            .patch(`/notes/${id}`)
            .send({ title: 'New Title' })
            .expect(200)
            .expect((res) => {
                expect(res.body.title).toBe('New Title');
                expect(res.body.content).toBe('Content');
            });
    });

    it('/notes (DELETE) - should remove note', async () => {
        const createRes = await request(app.getHttpServer())
            .post('/notes')
            .send({ title: 'To Delete', content: 'Content' });

        const id = createRes.body._id;

        // Eliminar
        await request(app.getHttpServer())
            .delete('/notes')
            .send({ ids: [id] })
            .expect(200);

        // Verificar que ya no existe
        return request(app.getHttpServer())
            .get(`/notes/${id}`)
            .expect(404);
    });
});
