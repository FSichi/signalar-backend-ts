import { Schema, model } from 'mongoose';
import { GradoHipoacusia } from '../enums/index.js';

const FichaParticularSchema = Schema({
    edad: {
        type: Number,
        required: [true, 'El nombre es obligatorio']
    },
    gradoHipoacusia: {
        type: String,
        required: false,
        default: GradoHipoacusia.LEVE,
        enum: [
            GradoHipoacusia.LEVE, GradoHipoacusia.MODERADA,
            GradoHipoacusia.SEVERA, GradoHipoacusia.PROFUNDA
        ]
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El Usuario es obligatorio'],
    }
});

FichaParticularSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}

export const FichaParticularModel = model('FichaParticular', FichaParticularSchema);
export default model('FichaParticular', FichaParticularSchema);