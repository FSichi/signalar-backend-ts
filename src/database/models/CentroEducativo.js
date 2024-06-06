import { Schema, model } from 'mongoose';

const CentroEducativoSchema = Schema({
    nombreCentro: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    habilitacionSiprosa: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    telefono: {
        type: String,
        required: [true, 'El Telefono de Contacto es obligatorio'],
    },
    cantProfesionales: {
        type: Number,
        required: [true, 'La cantidad de profesionales es obligatoria'],
    },
    cantLicencias: {
        type: Number,
        required: [true, 'La cantidad de licencias es obligatoria'],
    }
});

CentroEducativoSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export const CentroEducativoModel = model('CentroEducativo', CentroEducativoSchema);
export default model('CentroEducativo', CentroEducativoSchema);