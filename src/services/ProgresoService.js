import ProgresoAlumnoRepository from "../repository/ProgresoAlumnoRepository.js";
import ProgresoLeccionRepository from "../repository/ProgresoLeccionRepository.js";
import ProgresoSeccionRepository from "../repository/ProgresoSeccionRepository.js";
import ProgresoEvaluacionRepository from "../repository/ProgresoEvaluacionRepository.js";

import AlumnoService from "./AlumnoService.js";
import UserService from "./UserService.js";
import MaterialService from "./MaterialService.js";

import { UserRoles } from "../database/enums/index.js";
import { handleProcessError } from "../messages/ErrorHandlers.js";
import { checkIfObjectExists, isValidMongoDBID } from "../helpers/helperFunctions.js";


class ProgresoService {

    constructor() {
        this._PA_repository = new ProgresoAlumnoRepository();
        this._PL_repository = new ProgresoLeccionRepository();
        this._PS_repository = new ProgresoSeccionRepository();
        this._PE_repository = new ProgresoEvaluacionRepository();

        this._alumnoService = new AlumnoService();
        this._userService = new UserService();
        this._materialService = new MaterialService();
    }


    getAllProgresoLeccionByAlumnoId = async ({ id, userRole }) => {
        try {

            (userRole === UserRoles.ADMIN_ROLE || userRole === UserRoles.PROFESIONAL_ROLE)
                ? await this._alumnoService.getAndCheckAlumno({ idAlumno: id })
                : await this._userService.getUserById({ id });

            const listOfProgreso = await this._PL_repository.getAllByAlumno({ alumnoId: id });
            return listOfProgreso;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }

    }

    getAllProgresoLeccionCompletadoByAlumnoId = async ({ id, userRole }) => {
        try {

            (userRole === UserRoles.ADMIN_ROLE || userRole === UserRoles.PROFESIONAL_ROLE)
                ? await this._alumnoService.getAndCheckAlumno({ idAlumno: id })
                : await this._userService.getUserById({ id });

            const listOfProgreso = await this._PL_repository.getAllCompletadoByAlumno({ alumnoId: id });
            return listOfProgreso;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }

    }

    getOneProgresoLeccion = async ({ id }) => {
        try {

            isValidMongoDBID(id);

            const progreso = await this._PL_repository.getById({ id });
            checkIfObjectExists({ object: progreso, type: false, objectType: 'ProgresoLeccion' });

            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    createProgresoLeccion = async ({ data, userRol }) => {
        try {

            (userRol === (UserRoles.ADMIN_ROLE || UserRoles.PROFESIONAL_ROLE))
                ? await this._alumnoService.getAndCheckAlumno({ idAlumno: data.alumno })
                : await this._userService.getUserById({ id: data.alumno });

            await this._materialService.getLeccionById({ id: data.leccion });

            const progreso = await this._PL_repository.create({ data });


            const progresoAlumno = await this.getOneProgresoAlumno({ id: data.alumno });

            const PAUpdateData = {
                _id: progresoAlumno._id,
                lecciones: [...progresoAlumno.lecciones, progreso._id]
            }

            await this._PA_repository.update({ id: progresoAlumno._id, data: PAUpdateData });

            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    updateProgresoLeccion = async ({ id, data }) => {
        try {

            await this.getOneProgresoLeccion({ id });

            const progreso = await this._PL_repository.update({ id, data });
            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    finishProgresoLeccion = async ({ id, data }) => {
        try {

            await this.getOneProgresoLeccion({ id });

            const progreso = await this._PL_repository.update({ id, data });
            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }



    getAllProgresoSeccionByAlumnoId = async ({ id, userRole }) => {
        try {

            (userRole === UserRoles.ADMIN_ROLE || userRole === UserRoles.PROFESIONAL_ROLE)
                ? await this._alumnoService.getAndCheckAlumno({ idAlumno: id })
                : await this._userService.getUserById({ id });

            const listOfProgreso = await this._PS_repository.getAllByAlumno({ alumnoId: id });
            return listOfProgreso;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }

    }

    getOneProgresoSeccion = async ({ id }) => {
        try {

            isValidMongoDBID(id);

            const progreso = await this._PS_repository.getById({ id });
            checkIfObjectExists({ object: progreso, type: false, objectType: 'ProgresoSeccion' });

            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    createProgresoSeccion = async ({ data, userRol }) => {
        try {

            (userRol === (UserRoles.ADMIN_ROLE || UserRoles.PROFESIONAL_ROLE))
                ? await this._alumnoService.getAndCheckAlumno({ idAlumno: data.alumno })
                : await this._userService.getUserById({ id: data.alumno });

            await this._materialService.getSeccionById({ id: data.seccion });

            const progreso = await this._PS_repository.create({ data });

            const progresoAlumno = await this.getOneProgresoAlumno({ id: data.alumno });

            const PAUpdateData = {
                _id: progresoAlumno._id,
                secciones: [...progresoAlumno.secciones, progreso._id]
            }

            await this._PA_repository.update({ id: progresoAlumno._id, data: PAUpdateData });

            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    updateProgresoSeccion = async ({ id, data }) => {
        try {

            await this.getOneProgresoSeccion({ id });

            const progreso = await this._PS_repository.update({ id, data });
            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    finishProgresoSeccion = async ({ id, data }) => {
        try {

            await this.getOneProgresoSeccion({ id });

            const progreso = await this._PS_repository.update({ id, data });
            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }



    getAllProgresoEvaluacionByAlumnoId = async ({ id, userRole }) => {
        try {

            (userRole === UserRoles.ADMIN_ROLE || userRole === UserRoles.PROFESIONAL_ROLE)
                ? await this._alumnoService.getAndCheckAlumno({ idAlumno: id })
                : await this._userService.getUserById({ id });

            const listOfProgreso = await this._PE_repository.getAllByAlumno({ alumnoId: id });
            return listOfProgreso;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }

    }

    getAllProgresoEvaluacionForDashboardByAlumnoId = async ({ id, userRole }) => {
        try {

            (userRole === UserRoles.ADMIN_ROLE || userRole === UserRoles.PROFESIONAL_ROLE)
                ? await this._alumnoService.getAndCheckAlumno({ idAlumno: id })
                : await this._userService.getUserById({ id });

            const evaluacionesPendientes = await this._PE_repository.getAllPendienteByAlumno({ alumnoId: id });
            const evaluacionesAprobadas = await this._PE_repository.getAllCompletadoByAlumno({ alumnoId: id });

            const dataResponse = { evaluacionesPendientes, evaluacionesAprobadas }
            return dataResponse;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }

    }



    getOneProgresoEvaluacion = async ({ id }) => {
        try {

            isValidMongoDBID(id);

            const progreso = await this._PE_repository.getById({ id });
            checkIfObjectExists({ object: progreso, type: false, objectType: 'ProgresoEvaluacion' });

            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    createProgresoEvaluacion = async ({ data, userRol }) => {
        try {

            (userRol === (UserRoles.ADMIN_ROLE || UserRoles.PROFESIONAL_ROLE))
                ? await this._alumnoService.getAndCheckAlumno({ idAlumno: data.alumno })
                : await this._userService.getUserById({ id: data.alumno });

            await this._materialService.getEvaluativoById({ id: data.evaluacion });

            const progreso = await this._PE_repository.create({ data });

            const progresoAlumno = await this.getOneProgresoAlumno({ id: data.alumno });

            const PAUpdateData = {
                _id: progresoAlumno._id,
                evaluaciones: [...progresoAlumno.evaluaciones, progreso._id]
            }

            await this._PA_repository.update({ id: progresoAlumno._id, data: PAUpdateData });


            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    updateProgresoEvaluacion = async ({ id, data }) => {
        try {

            await this.getOneProgresoEvaluacion({ id });

            const progreso = await this._PE_repository.update({ id, data });
            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    finishProgresoEvaluacion = async ({ id, data }) => {
        try {

            await this.getOneProgresoEvaluacion({ id });

            const progreso = await this._PE_repository.update({ id, data });
            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }



    getOneProgresoAlumno = async ({ id }) => {
        try {

            isValidMongoDBID(id);

            const progreso = await this._PA_repository.getOne({ alumno: id });
            checkIfObjectExists({ object: progreso, type: false, objectType: 'ProgresoAlumno' });

            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    createProgresoAlumno = async ({ data, userRol }) => {
        try {

            (userRol === (UserRoles.ADMIN_ROLE || UserRoles.PROFESIONAL_ROLE))
                ? await this._alumnoService.getAndCheckAlumno({ idAlumno: data.alumno })
                : await this._userService.getUserById({ id: data.alumno });


            const progreso = await this._PA_repository.create({ data });
            return progreso;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    updateProgresoAlumno = async ({ id, data }) => {
        try {

            isValidMongoDBID(id);

            const progreso = await this._PA_repository.getById({ id });
            checkIfObjectExists({ object: progreso, type: false, objectType: 'ProgresoAlumno' });

            const progresoUpdated = await this._PA_repository.update({ id, data });
            return progresoUpdated;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }



    getHistoryReportAlumno = async ({ id, userRole }) => {
        try {

            const response = {
                alumno: {
                    nombre: "",
                    edad: 0,
                    gradoHipoacusia: "",
                    escuela: "",
                    docenteAsignado: "",
                },
                progresoAlumno: {
                    lecciones: {
                        completadas: 0,
                        historial: {
                            completadas: [],
                            pendientes: []
                        }
                    },
                },
                secciones: {
                    completadas: 0,
                    historial: {
                        completadas: [],
                        pendientes: []
                    }
                },
                evaluaciones: {
                    pendientes: 0,
                    completadas: 0,
                    desaprobadas: 0,
                    historial: []
                }
            };

            isValidMongoDBID(id);

            const alumno = (userRole === UserRoles.ADMIN_ROLE || userRole === UserRoles.PROFESIONAL_ROLE)
                ? await this._alumnoService.getAndCheckAlumno({ idAlumno: id })
                : await this._userService.getUserById({ id });

            const progresoAlumno = await this._PA_repository.getOne({ alumno: id });


        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

}

export default ProgresoService;