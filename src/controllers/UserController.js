import { handleSuccessResponse, handleErrorResponse } from '../messages/HTTPResponse.js';
import UserService from '../services/UserService.js';

class UserController {

    constructor() {
        this._userService = new UserService();
    }

    getAllUsers = async (req, res) => {

        const { ficha } = req.query;

        try {

            const listOfUsers = (ficha === 'true')
                ? await this._userService.getAllUsersWithFicha()
                : await this._userService.getAllUsers();

            handleSuccessResponse(res, 200, listOfUsers);

        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

    getUserById = async (req, res) => {

        const { userId } = req.params;
        const { ficha } = req.query;

        try {

            const user = (ficha === 'true')
                ? await this._userService.getUserWithFichaById({ id: userId })
                : await this._userService.getUserById({ id: userId });

            handleSuccessResponse(res, 200, user);

        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

    createUserWithFicha = async (req, res) => {

        const { nombreCompleto, correo, password, rol, img, ficha } = req.body;

        try {

            const usuarioToDB = { nombreCompleto, correo, password, rol, img, ficha };
            const { userCreated } = await this._userService.createUserWithFicha({ userData: usuarioToDB });

            handleSuccessResponse(res, 201, { user: userCreated });

        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

    updateUser = async (req, res) => {

        const { _id, nombreCompleto, img } = req.body;
        const userData = { _id, nombreCompleto, img };

        try {

            const userUpdated = await this._userService.updateUser({ userData });
            handleSuccessResponse(res, 200, { user: userUpdated });

        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

    changeUserStatus = async (req, res) => {

        const { _id, estado } = req.body;
        const userData = { _id, estado };

        try {

            const userUpdated = await this._userService.changeUserStatus({ userData });
            handleSuccessResponse(res, 200, { user: userUpdated });

        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

    getDashboardInfo = async (req, res) => {

        const { _id, rol: userRole } = req.usuario;

        try {
            const dashboardInfo = await this._userService.getDashboardInfo({ _id, userRole });
            handleSuccessResponse(res, 200, dashboardInfo);
        } catch (error) {
            handleErrorResponse(res, error);
        }

    }

}

export default UserController;