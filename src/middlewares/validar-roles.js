import { response } from 'express';
import { handleErrorResponse } from '../messages/HTTPResponse.js';
import { UserRoles } from '../database/enums/index.js';

export const esAdminRole = (req, res = response, next) => {

    if (!req.usuario) {
        return handleErrorResponse(res, {
            status: 401,
            message: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombreCompleto } = req.usuario;

    if (rol !== UserRoles.ADMIN_ROLE) {
        return handleErrorResponse(res, {
            status: 401,
            message: `${nombreCompleto} no es administrador - No puede hacer esto`
        });
    }

    next();
}

export const tieneRole = (...roles) => {
    return (req, res = response, next) => {

        if (!req.usuario) {
            return handleErrorResponse(res, {
                status: 401,
                message: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return handleErrorResponse(res, {
                status: 401,
                message: `El servicio requiere uno de estos roles ${roles}`
            });
        }

        next();
    }
}

export default {
    esAdminRole,
    tieneRole
}