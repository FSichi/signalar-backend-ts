import { Schema, model } from 'mongoose';
import { Recurso } from '../enums/index.js';

const ContenidoPracticoSchema = Schema({
    recurso: {
        type: String,
        required: [true, 'El recurso asociado es obligatorio'],
        default: Recurso.AHORCADITO,
        enum: [Recurso.AHORCADITO, Recurso.COINCIDENCIA, Recurso.MEMORIA, Recurso.RULETA, Recurso.UNIR]
    },
    gifs: [{
        type: String,
        required: true,
    }],
    palabras: [{
        type: String,
        required: false,
    }],
    imagenes: [{
        type: String,
        required: false,
    }],
});

ContenidoPracticoSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export const ContenidoPracticoModel = model('ContenidoPractico', ContenidoPracticoSchema);
export default model('ContenidoPractico', ContenidoPracticoSchema);