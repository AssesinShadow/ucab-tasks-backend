import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Esquema de la entidad Note (Nota)
 * 
 * Representa una nota de texto con los siguientes atributos:
 * - title: Título de la nota (requerido)
 * - content: Contenido de la nota (requerido)
 * - createdAt: Fecha de creación (generada automáticamente)
 * - updatedAt: Fecha de última modificación (actualizada automáticamente)
 * - _id: Identificador único generado por MongoDB
 * 
 * @class Note
 * @extends Document
 */
@Schema({ 
  timestamps: true, // Genera automáticamente createdAt y updatedAt
  collection: 'notes' // Nombre de la colección en MongoDB
})
export class Note extends Document {
  /**
   * Título de la nota
   * @type {string}
   */
  @Prop({ 
    required: true,
    trim: true, // Elimina espacios al inicio y final
    maxlength: 200 // Longitud máxima del título
  })
  title: string;

  /**
   * Contenido detallado de la nota
   * @type {string}
   */
  @Prop({ 
    required: true,
    trim: true
  })
  content: string;

  /**
   * Fecha de creación de la nota
   * Generada automáticamente por MongoDB al crear el documento
   * @type {Date}
   */
  createdAt?: Date;

  /**
   * Fecha de última modificación de la nota
   * Actualizada automáticamente por MongoDB al modificar el documento
   * @type {Date}
   */
  updatedAt?: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);