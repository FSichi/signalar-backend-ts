import { handleDatabaseError } from '../messages/ErrorHandlers.js';
import { checkValidPassword } from './bcryptHelpers.js';

export const checkUserStatusForLogin = (user, password) => {

    let userStatus = true;
    let error = { status: 401, message: '' }

    // Verificar si el email existe
    if (user === null || typeof user == 'undefined' || !user) {
        userStatus = false;
        error.message = 'Usuario / Password no son correctos'
    }

    // SI el usuario esta deshabilitado
    if ((user !== null) && !user.estado) {
        userStatus = false;
        error.message = 'Estado del Usuario: Usuario Bloqueado'
    }

    // Verificar la contraseña - Hash con BcryptJs
    if (user !== null) {
        const validPassword = checkValidPassword({ passwordProvided: password, passwordHashed: user.password })
        if (!validPassword) {
            userStatus = false;
            error.message = 'Usuario / Password no son correctos'
        }
    }

    return { userStatus, error };
}

export const checkIfObjectExists = ({ objectId = '', object, type = false, objectType = '' }) => {

    if (object === null) {
        handleDatabaseError({ status: 407, error: `No Existe el/la ${objectType} que estas buscando` });
    }

    if ((!type) ? (!object) : (object.length === 0)) {
        handleDatabaseError({ status: 407, error: `No Existe ${objectType} con id: ${objectId}` });
    }

};

export const isValidMongoDBID = (id) => {

    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    objectIdPattern.test(id);

    if (!objectIdPattern.test(id)) {
        throw new Error('El ID proporcionado no es válido');
    }

}

export default {
    checkUserStatusForLogin,
    checkIfObjectExists,
    isValidMongoDBID
};