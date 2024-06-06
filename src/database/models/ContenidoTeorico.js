import { Schema, model } from 'mongoose';

const ContenidoTeoricoSchema = Schema({
    img: {
        type: String,
        required: false
    },
    gif: {
        type: String,
        required: false
    },
    tema: {
        type: String,
        required: [true, 'El Tema del ContenidoTeorico es obligatorio'],
    },
    body: [{
        type: String,
        required: [true, 'El Cuerpo del ContenidoTeorico es obligatorio'],
    }],
});

ContenidoTeoricoSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export const ContenidoTeoricoModel = model('ContenidoTeorico', ContenidoTeoricoSchema);
export default model('ContenidoTeorico', ContenidoTeoricoSchema);