import { Schema, model } from 'mongoose';
import { ProgresoEvaluacion } from '../enums/index.js';

const ProgresoSeccionSchema = Schema({
    alumno: {
        type: Schema.Types.ObjectId,
        required: [true, 'El ID de referencia del alumno es obligatorio'],
    },
    seccion: {
        type: Schema.Types.ObjectId,
        ref: 'Seccion',
        required: [true, 'El ID de referencia de la seccion es obligatorio'],
    },
    progreso: {
        type: String,
        required: [true, 'El Estado de la Seccion es obligatorio'],
        default: ProgresoEvaluacion.PENDIENTE,
        enum: [ProgresoEvaluacion.PENDIENTE, ProgresoEvaluacion.COMPLETADO]
    },
    leccionesCompletadas: {
        type: Number,
        default: 0,
        required: [true, 'El numero de lecciones completadas es obligatorio'],
    },
    completionDate: {
        type: Date,
        required: false
    },
});

// Índices
ProgresoSeccionSchema.index({ 'alumno.tipo': 1, 'alumno.referencia': 1 });

ProgresoSeccionSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export const ProgresoSeccionModel = model('ProgresoSeccion', ProgresoSeccionSchema);
export default model('ProgresoSeccion', ProgresoSeccionSchema);