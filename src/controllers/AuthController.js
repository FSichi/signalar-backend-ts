import { handleErrorLogin, handleErrorResponse, handleSuccessResponse } from "../messages/HTTPResponse.js";
import AuthService from "../services/AuthService.js";

class AuthController {

    constructor() {
        this._authService = new AuthService();
    }

    login = async (req, res) => {

        const { correo, password } = req.body;

        try {
            const { token, usuario } = await this._authService.checkStatusForLogin(correo, password);
            handleSuccessResponse(res, 200, { authenticated: true, user: usuario, token: token });
        } catch (error) {
            handleErrorLogin(res, error);
        }
    };

    renewToken = async (req, res) => {

        const { _id } = req.usuario;

        try {
            const { token } = await this._authService.renewToken({ uid: _id });
            // handleSuccessResponse(res, 200, { user: _id, token: token });
            handleSuccessResponse(res, 200, { token: token });
        } catch (error) {
            handleErrorResponse(res, { status: error?.status || 500, message: error?.message || error });
        }
    };

    updateUserPassword = async (req, res) => {

        const { correo, password } = req.body;

        try {
            const { userUpdated, hashedPassword } = await this._authService.updateUserPassword({ correo, password });
            handleSuccessResponse(res, 200, { usuarioId: userUpdated._id, newPassword: hashedPassword });
        } catch (error) {
            handleErrorResponse(res, { status: error?.status || 500, message: error?.message || error });
        }
    };

}

export default AuthController;