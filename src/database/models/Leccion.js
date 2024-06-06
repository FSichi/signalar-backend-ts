import { Schema, model } from 'mongoose';
import { Dificultad, EstadoContenido } from '../enums/index.js';

const LeccionSchema = Schema({
    seccion: {
        type: Schema.Types.ObjectId,
        ref: 'Seccion',
        required: [true, 'La Seccion Padre es obligatoria'],
    },
    nombre: {
        type: String,
        required: [true, 'El nombre de la Leccion es obligatorio'],
    },
    dificultad: {
        type: String,
        required: [true, 'La Dificultad de la Leccion es obligatoria'],
        default: Dificultad.MEDIA,
        enum: [Dificultad.BAJA, Dificultad.MEDIA, Dificultad.ALTA]
    },
    cantRecursos: {
        type: Number,
        required: [true, 'La cantidad de recursos en la leccion es obligatoria'],
    },
    estado: {
        type: String,
        required: [true, 'El Estado de la seccion es obligatorio'],
        default: EstadoContenido.ACTIVO,
        enum: [EstadoContenido.ACTIVO, EstadoContenido.INACTIVO]
    },
    contenidoLeccion: {
        teoria: [{
            type: Schema.Types.ObjectId,
            ref: 'ContenidoTeorico',
            required: [true, 'La Teoria Asociada a la leccion es obligatoria'],
        }],
        practica: [{
            type: Schema.Types.ObjectId,
            ref: 'ContenidoPractico',
            required: [true, 'La Practica Asociada a la leccion es obligatoria'],
        }]
    }
});

LeccionSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export const LeccionModel = model('Leccion', LeccionSchema);
export default model('Leccion', LeccionSchema);