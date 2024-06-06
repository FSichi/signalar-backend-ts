import { response, request } from 'express'
import jwt from 'jsonwebtoken'

import { UsuarioModel } from '../database/models/index.js'
import { handleErrorResponse } from '../messages/HTTPResponse.js'

export const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return handleErrorResponse(res, { status: 401, message: 'No hay token en la petición' });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await UsuarioModel.findById(uid);
        const { status, error } = checkUserStatus({ user: usuario })

        if (!status) {
            return handleErrorResponse(res, { status: error.status, message: error.message });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {  // Manejar el error de token expirado
            handleErrorResponse(res, { status: 401, message: 'El token ha expirado' });
        } else {  // Manejar otros errores
            handleErrorResponse(res, { status: error.status || 401, message: error.message || 'Token no válido' });
        }
    }
}

const checkUserStatus = ({ user }) => {

    let status = true;
    let error = { status: 401, message: '' }

    // Verificar si el Usuario Existe
    if (!user) {
        status = false;
        error = { status: 401, message: 'Token no válido - usuario no existe DB' }
    }

    // Verificar si el Usuario tiene estado false - Baja Logica
    if (!user.estado) {
        status = false;
        error = { status: 401, message: 'Token no válido - usuario con estado: false' }
    }

    return { status, error };
}

export default validarJWT;