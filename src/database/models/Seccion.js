import { Schema, model } from 'mongoose';
import { Area, EstadoContenido } from '../enums/index.js';

const SeccionSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la Seccion es obligatorio'],
    },
    area: {
        type: String,
        required: [true, 'El Area a la que pertenece la Seccion es obligatoria'],
        default: Area.MATEMATICAS,
        enum: [Area.CNATURALES, Area.CSOCIALES, Area.MATEMATICAS, Area.LENGUA]
    },
    cantLecciones: {
        type: Number,
        required: [true, 'La cantidad de lecciones en la seccion es obligatoria'],
    },
    estado: {
        type: String,
        required: [true, 'El Estado de la seccion es obligatorio'],
        default: EstadoContenido.ACTIVO,
        enum: [EstadoContenido.ACTIVO, EstadoContenido.INACTIVO]
    },
});

SeccionSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export const SeccionModel = model('Seccion', SeccionSchema);
export default model('Seccion', SeccionSchema);