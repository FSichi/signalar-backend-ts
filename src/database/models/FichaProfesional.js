import { Schema, model } from 'mongoose';
import { Profesiones } from '../enums/index.js';

const FichaProfesionalSchema = Schema({
    tipoProfesion: {
        type: String,
        required: false,
        default: Profesiones.MAESTRO_ESPECIAL,
        enum: [
            Profesiones.FONOAUDIOLOGO, Profesiones.MAESTRO_ESPECIAL, Profesiones.PSICOLOGO,
            Profesiones.TERAPISTA_OCUPACIONAL, Profesiones.OTRO
        ]
    },
    matriculaProfesional: {
        type: String,
        required: [true, 'La Matricula es obligatoria'],
    },
    centroAsociado: {
        type: Schema.Types.ObjectId,
        ref: 'CentroEducativo',
        required: false
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El Usuario es obligatorio'],
    }
});

FichaProfesionalSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export const FichaProfesionalModel = model('FichaProfesional', FichaProfesionalSchema);
export default model('FichaProfesional', FichaProfesionalSchema);