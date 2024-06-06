import { Schema, model } from 'mongoose';
import { ProgresoEvaluacion } from '../enums/index.js';

const ProgresoLeccionSchema = Schema({
    alumno: {
        type: Schema.Types.ObjectId,
        required: [true, 'El ID de referencia del alumno es obligatorio'],
    },
    leccion: {
        type: Schema.Types.ObjectId,
        ref: 'Leccion',
        required: [true, 'El ID de referencia de la leccion es obligatorio'],
    },
    progreso: {
        type: String,
        required: [true, 'El Estado de la Leccion es obligatorio'],
        default: ProgresoEvaluacion.PENDIENTE,
        enum: [ProgresoEvaluacion.PENDIENTE, ProgresoEvaluacion.COMPLETADO]
    },
    teoria: {
        type: Boolean,
        default: false,
        required: [true, 'El Estado de la teoria es obligatorio'],
    },
    practica: {
        type: Boolean,
        default: false,
        required: [true, 'El Estado de la practica es obligatorio'],
    },
    attemptDate: {
        type: Date,
        required: [true, 'La Fecha del registro es obligatoria'],
    },
});

// Índices
ProgresoLeccionSchema.index({ 'alumno.tipo': 1, 'alumno.referencia': 1 });

ProgresoLeccionSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export const ProgresoLeccionModel = model('ProgresoLeccion', ProgresoLeccionSchema);
export default model('ProgresoLeccion', ProgresoLeccionSchema);