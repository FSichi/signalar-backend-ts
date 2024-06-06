import UserRepository from "../repository/UserRepository.js";
import { handleProcessError } from "../messages/ErrorHandlers.js";
import { checkIfObjectExists, checkUserStatusForLogin, comparePassword, encryptPassword, generarJWT } from "../helpers/index.js";

class AuthService {

    constructor() {
        this._userRepository = new UserRepository();
    }

    async checkStatusForLogin(correo, password) {

        try {
            const usuario = await this._userRepository.getUserByEmail({ correo: correo });

            const { userStatus, error } = checkUserStatusForLogin(usuario, password);

            if (!userStatus) {
                return handleProcessError({ status: error.status, error: error.message || '' });
            }

            const token = await generarJWT(usuario.id);
            return { usuario, token };

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }

    }

    async renewToken({ uid }) {
        try {
            const token = await generarJWT(uid);
            return { token };
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async updateUserPassword({ correo, password }) {

        try {
            const user = await this._userRepository.getUserPassword({ correo: correo });

            checkIfObjectExists({ object: user, type: false, objectType: 'Usuario' });

            const samePassword = await comparePassword({ currentPassword: user.password, newPassword: password });
            if (samePassword) {
                handleProcessError({ status: 401, error: 'No puedes cambiar la contraseña actual por la misma' });
            }

            const hashedPassword = encryptPassword(password);
            const userUpdated = await this._userRepository.update({ id: user._id, data: { password: hashedPassword } });

            return { userUpdated, hashedPassword };

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

}

export default AuthService;