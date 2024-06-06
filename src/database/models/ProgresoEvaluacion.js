import { Schema, model } from 'mongoose';
import { ProgresoEvaluacion } from '../enums/index.js';

const ProgresoEvaluacionSchema = Schema({
    alumno: {
        type: Schema.Types.ObjectId,
        required: [true, 'El ID de referencia del alumno es obligatorio'],
    },
    evaluacion: {
        type: Schema.Types.ObjectId,
        ref: 'Evaluativo',
        required: [true, 'El ID de referencia de la evaluacion es obligatorio'],
    },
    progreso: {
        type: String,
        required: [true, 'El Estado de la Evaluacion es obligatorio'],
        default: ProgresoEvaluacion.PENDIENTE,
        enum: [ProgresoEvaluacion.PENDIENTE, ProgresoEvaluacion.COMPLETADO, ProgresoEvaluacion.DESAPROBADO]
    },
    attemptDate: {
        type: Date,
        required: false
    },
});

// Índices
ProgresoEvaluacionSchema.index({ 'alumno.tipo': 1, 'alumno.referencia': 1 });

ProgresoEvaluacionSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export const ProgresoEvaluacionModel = model('ProgresoEvaluacion', ProgresoEvaluacionSchema);
export default model('ProgresoEvaluacion', ProgresoEvaluacionSchema);