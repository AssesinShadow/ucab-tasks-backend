# UCAB Tasks - API de Gestión de Notas

Proyecto para la asignatura Tópicos Especiales de Programación. API RESTful para crear, editar, eliminar y consultar notas de texto.

## 📋 Requisitos Previos
* [cite_start]**Node.js**: v18 o superior..
* [cite_start]**Base de Datos**: MongoDB (Debe estar instalada y corriendo localmente en el puerto 27017).
* En caso de no saber como instalar MongoDB: https://youtu.be/eKXIxSZrJfw?si=zQxPtGDaeJZUzBlp

## 🚀 Instalación y Ejecución
[cite_start]Sigue estos pasos para ejecutar el prototipo localmente[cite: 42]:

1.  Clonar el repositorio:
    ```bash
    git clone <https://github.com/AssesinShadow/ucab-tasks-backend.git>
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Ejecutar el servidor en modo desarrollo:
    ```bash
    npm run start:dev
    ```
4. Encender la Base de Datos
   ```bash
   mongod.exe
   ```
   
5. Interfaz para la Base de Datos
   ```bash
   mongosh
   ```

## 📚 Documentación
* [cite_start]**Swagger**: Una vez iniciado el servidor, visita `http://localhost:3000/api` para ver la documentación interactiva de los endpoints.

* [cite_start]**Pruebas Unitarias**: Al momento de querer correr las pruebas unitarias del programa (hechas con Jest), escribe en el terminal npm run test.
* No es necesario instalar Jest ya que viene con la instalacion de Node.js

## 👤 Autores
* Alejandro Poveda Marcano
* Andres Daniel De Quintal Nóbrega
* Juan José de Jesús Panza Rivero
