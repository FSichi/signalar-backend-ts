import { Schema, model } from 'mongoose';
import { UserRoles } from '../enums/index.js';

const RoleSchema = Schema({
    rol: {
        type: String,
        default: UserRoles.PARTICULAR_ROLE,
        enum: [UserRoles.ADMIN_ROLE, UserRoles.PROFESIONAL_ROLE, UserRoles.PARTICULAR_ROLE],
        required: [true, 'El rol es obligatorio']
    }
});

export const RoleModel = model('Role', RoleSchema);
export default model('Role', RoleSchema);