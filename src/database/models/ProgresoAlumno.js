import { Schema, model } from 'mongoose';

const ProgresoAlumnoSchema = Schema({
    alumno: {
        type: Schema.Types.ObjectId,
        required: [true, 'El ID de referencia del alumno es obligatorio'],
    },
    secciones: [{
        type: Schema.Types.ObjectId,
        ref: 'ProgresoSeccion',
        required: false
    }],
    lecciones: [{
        type: Schema.Types.ObjectId,
        ref: 'ProgresoLeccion',
        required: false
    }],
    evaluaciones: [{
        type: Schema.Types.ObjectId,
        ref: 'ProgresoEvaluacion',
        required: false
    }],
});

// Índices
ProgresoAlumnoSchema.index({ 'alumno.tipo': 1, 'alumno.referencia': 1 });

ProgresoAlumnoSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export const ProgresoAlumnoModel = model('ProgresoAlumno', ProgresoAlumnoSchema);
export default model('ProgresoAlumno', ProgresoAlumnoSchema);