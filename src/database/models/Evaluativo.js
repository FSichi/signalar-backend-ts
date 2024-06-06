import { Schema, model } from 'mongoose';
import { Area } from '../enums/index.js';

const EvaluativoSchema = Schema({
    leccion: {
        type: Schema.Types.ObjectId,
        ref: 'Leccion',
        required: [true, 'La Leccion Asociada es Obligatoria'],
    },
    nombreSeccion: {
        type: String,
        required: [true, 'El nombre de la Seccion es obligatorio'],
    },
    area: {
        type: String,
        required: [true, 'El Area a la que pertenece la Evaluacion es obligatoria'],
        default: Area.MATEMATICAS,
        enum: [Area.CNATURALES, Area.CSOCIALES, Area.MATEMATICAS, Area.LENGUA]
    },
    contenidoEvaluacion: [{
        type: Schema.Types.ObjectId,
        ref: 'ContenidoPractico',
        required: [true, 'El Contenido de la Evaluacion es obligatorio'],
    }]
});

EvaluativoSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export const EvaluativoModel = model('Evaluativo', EvaluativoSchema);
export default model('Evaluativo', EvaluativoSchema);