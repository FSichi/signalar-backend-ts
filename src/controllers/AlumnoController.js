import AlumnoService from "../services/AlumnoService.js";
import { handleErrorResponse, handleSuccessResponse } from "../messages/HTTPResponse.js";
import { EstadoAlumno } from "../database/enums/index.js";

class AlumnoController {

    constructor() {
        this._alumnoService = new AlumnoService();
    }

    getAllAlumnos = async (req, res) => {
        try {
            const listOfAlumnos = await this._alumnoService.getAllAlumnos();
            handleSuccessResponse(res, 200, listOfAlumnos);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

    getAlumnoById = async (req, res) => {

        const { alumnoId } = req.params;
        const { rol: userRole, _id: userId } = req.usuario;

        try {
            const alumno = await this._alumnoService.getAlumnoById({ idAlumno: alumnoId, userRole: userRole, idUser: userId });
            handleSuccessResponse(res, 200, alumno);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

    getAllAlumnosDocente = async (req, res) => {

        const idDocente = req.usuario._id;

        try {
            const listOfAlumnos = await this._alumnoService.getAllAlumnosDocente({ id: idDocente });
            handleSuccessResponse(res, 200, listOfAlumnos);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

    getAlumnoActivo = async (req, res) => {

        const idDocente = req.usuario._id;

        try {
            const alumnoActivo = await this._alumnoService.getAlumnoActivo({ id: idDocente });

            if (!alumnoActivo) {
                handleSuccessResponse(res, 200, 'El docente Actual no tiene un alumno activo');
            }

            handleSuccessResponse(res, 200, alumnoActivo);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    };


    createAlumno = async (req, res) => {

        const { ...body } = req.body;

        const data = {
            ...body,
            estado: EstadoAlumno.ACTIVO,
            alumnoActivo: false,
            docenteAsignado: req.usuario._id,
        }

        try {
            const alumnoCreated = await this._alumnoService.createAlumno({ data: data });
            handleSuccessResponse(res, 201, alumnoCreated)
        } catch (error) {
            handleErrorResponse(res, error);
        }

    };

    updateAlumno = async (req, res) => {

        const { _id: alumnoId, ...body } = req.body;
        const { rol: userRole, _id: userId } = req.usuario;

        try {

            const alumnoUpdated = await this._alumnoService.updateAlumno({
                idAlumno: alumnoId,
                idUser: userId,
                userRole: userRole,
                data: body,
            });

            handleSuccessResponse(res, 200, alumnoUpdated)
        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

    updateAlumnoStatus = async (req, res) => {

        const { _id: alumnoId, estado } = req.body;
        const { rol: userRole, _id: userId } = req.usuario;

        try {

            const alumnoUpdated = await this._alumnoService.updateStatus({
                idAlumno: alumnoId,
                idUser: userId,
                userRole: userRole,
                data: { estado: estado },
            });

            handleSuccessResponse(res, 200, alumnoUpdated)
        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

    setAlumnoActivo = async (req, res) => {

        const { _id: alumnoId, alumnoActivo } = req.body;
        const { rol: userRole, _id: userId } = req.usuario;

        try {
            const alumnoUpdated = await this._alumnoService.setActivo({
                idAlumno: alumnoId,
                idUser: userId,
                userRole: userRole,
                data: { alumnoActivo: alumnoActivo },
            });

            handleSuccessResponse(res, 200, alumnoUpdated)
        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

};

export default AlumnoController;