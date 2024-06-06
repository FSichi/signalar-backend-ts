import { Schema, model } from 'mongoose';
import { UserRoles } from '../enums/index.js';

const UsuarioSchema = Schema({
    nombreCompleto: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
        required: [true, 'La imagen es obligatoria'],
    },
    rol: {
        type: String,
        default: UserRoles.PARTICULAR_ROLE,
        enum: [UserRoles.ADMIN_ROLE, UserRoles.PROFESIONAL_ROLE, UserRoles.PARTICULAR_ROLE],
        required: [true, 'El Rol es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export const UsuarioModel = model('Usuario', UsuarioSchema);
export default model('Usuario', UsuarioSchema);