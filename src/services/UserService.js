import UserRepository from "../repository/UserRepository.js";
import { handleProcessError } from "../messages/ErrorHandlers.js";
import { checkFichaUsuario, checkIfObjectExists, encryptPassword, generarJWT, isValidMongoDBID } from "../helpers/index.js";
import { UserRoles } from "../database/enums/index.js";
import AlumnoService from "./AlumnoService.js";
import ProgresoService from "./ProgresoService.js";

class UserService {

    constructor() {
        this._userRepository = new UserRepository();
    }

    async getAllUsers() {
        try {
            const listOfUsers = await this._userRepository.getAll();
            return listOfUsers;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async getAllUsersWithFicha() {
        try {
            const usersWithFichas = await this._userRepository.getAllUsersWithFicha();
            return usersWithFichas;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async getUserById({ id }) {
        try {
            isValidMongoDBID(id);

            const user = await this._userRepository.getById({ id: id });
            checkIfObjectExists({ object: user, type: false, objectType: 'Usuario' });

            return user;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async getUserWithFichaById({ id }) {
        try {

            // isValidMongoDBID(id);
            await this.getUserById({ id: _id });

            const userWithFicha = await this._userRepository.getUserWithFichaById({ id: id });
            checkIfObjectExists({ object: userWithFicha, objectId: id, objectType: 'Usuario', type: true });

            return userWithFicha[0];

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async createUserWithFicha({ userData }) {

        const { nombreCompleto, correo, password, rol, img, ficha } = userData;

        if (rol !== UserRoles.ADMIN_ROLE && (!ficha || Object.keys(ficha).length === 0)) {
            return handleProcessError({ status: 500, error: 'El campo ficha es obligatorio - El tipo de usuario requiere ficha' });
        }

        try {

            let usuarioToDB = { nombreCompleto, correo, password, rol, img };
            let fichaToDB = null;

            if (rol !== UserRoles.ADMIN_ROLE) {
                const { fichaStatus, fichaResponse, errorStatus } = await checkFichaUsuario(rol, ficha)

                if (!fichaStatus) {
                    return handleProcessError({ status: errorStatus.status, error: errorStatus.message });
                }

                fichaToDB = fichaResponse;
            }

            usuarioToDB.password = encryptPassword(password);
            let userCreated = await this._userRepository.create({ data: usuarioToDB });

            if (fichaToDB) {
                fichaToDB.usuario = userCreated._id;
                const fichaCreated = await this._userRepository.createFicha({ rol, data: fichaToDB });
                userCreated = { ...userCreated._doc, fichaCreated };
            }

            // const token = await generarJWT(userCreated._id);
            return { userCreated };

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async updateUser({ userData }) {

        const { _id, nombreCompleto, img } = userData;

        try {

            // isValidMongoDBID(id);
            await this.getUserById({ id: _id });

            const userUpdated = await this._userRepository.update({ id: _id, data: { nombreCompleto, img } });
            return userUpdated;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async changeUserStatus({ userData }) {

        const { _id, estado } = userData;

        try {

            isValidMongoDBID(id);
            await this.getUserById({ id: _id });

            const userUpdated = await this._userRepository.update({ id: _id, data: { estado } });
            return userUpdated;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }

    }

    async getDashboardInfo({ _id, userRole }) {

        const alumnoService = new AlumnoService();
        const progresoService = new ProgresoService();

        let dataResponse = {
            alumnoActivo: null,
            cards: {
                cantidadEstudiantes: 0,
                leccionesCompletadas: 0,
                evaluacionesAprobadas: 0,
                evaluacionesPendientes: 0
            }
        }

        try {

            const totalAlumnos = await alumnoService.getAllAlumnosDocente({ id: _id })
            dataResponse.cards.cantidadEstudiantes = totalAlumnos.length;

            const alumnoActivo = await alumnoService.getAlumnoActivoForDashboard({ id: _id });

            if (!alumnoActivo) {
                return dataResponse;
            }

            const totalLecciones = await progresoService.getAllProgresoLeccionCompletadoByAlumnoId({ id: alumnoActivo._id, userRole });
            const totalEvaluaciones = await progresoService.getAllProgresoEvaluacionForDashboardByAlumnoId({ id: alumnoActivo._id, userRole });

            dataResponse = {
                alumnoActivo: alumnoActivo,
                cards: {
                    cantidadEstudiantes: totalAlumnos.length,
                    leccionesCompletadas: totalLecciones.length,
                    evaluacionesAprobadas: totalEvaluaciones.evaluacionesAprobadas.length,
                    evaluacionesPendientes: totalEvaluaciones.evaluacionesPendientes.length
                }
            }

            return dataResponse;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }


}

export default UserService;