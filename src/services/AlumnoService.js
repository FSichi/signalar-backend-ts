import AlumnoRepository from "../repository/AlumnoRepository.js";
import { checkIfObjectExists, isValidMongoDBID } from "../helpers/helperFunctions.js";
import { handleProcessError } from "../messages/ErrorHandlers.js";
import { UserRoles } from "../database/enums/index.js";

class AlumnoService {

    constructor() {
        this._alumnoRepository = new AlumnoRepository();
    }

    async getAllAlumnos() {
        try {
            const listOfAlumnos = await this._alumnoRepository.getAllAlumnos();
            return listOfAlumnos;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async getAlumnoById({ idAlumno, userRole, idUser }) {
        try {

            isValidMongoDBID(idAlumno);

            const alumno = await this._alumnoRepository.getById({ id: idAlumno });
            checkIfObjectExists({ object: alumno, type: false, objectType: 'Alumno' });

            if (
                (userRole === UserRoles.ADMIN_ROLE) ||
                (userRole === UserRoles.PROFESIONAL_ROLE && alumno.docenteAsignado._id.toString() === idUser.toString())
            ) {
                return alumno;
            }

            handleProcessError({ status: 407, error: 'El alumno no pertenece al Docente Actual' });

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async getAllAlumnosDocente({ id }) {
        try {
            const listOfAlumnos = await this._alumnoRepository.getAll({ docenteAsignado: id });
            return listOfAlumnos;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async getAlumnoActivo({ id }) {
        try {
            const alumnoActivo = await this._alumnoRepository.getOne({ docenteAsignado: id, alumnoActivo: true });
            return alumnoActivo;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async getAlumnoActivoForDashboard({ id }) {

        try {
            const alumnoActivo = await this._alumnoRepository.getOne({ docenteAsignado: id, alumnoActivo: true });

            if (!alumnoActivo) {
                return null;
            }

            const alumnoResponse = {
                _id: alumnoActivo._id,
                nombreCompleto: alumnoActivo.nombreCompleto,
            }

            return alumnoResponse;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async createAlumno({ data }) {
        try {
            const alumnoCreated = await this._alumnoRepository.createAlumno({ data });
            return alumnoCreated;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async updateAlumno({ idAlumno, idUser, userRole, data }) {
        try {

            const alumno = await this.getAlumnoById({ idAlumno, userRole, idUser });
            const updatedData = { ...alumno._doc, ...data }

            const alumnoUpdated = await this._alumnoRepository.updateAlumno({ id: idAlumno, data: updatedData });
            return alumnoUpdated;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async updateStatus({ idAlumno, idUser, userRole, data }) {
        try {

            await this.getAlumnoById({ idAlumno, userRole, idUser });

            const alumnoUpdated = await this._alumnoRepository.update({ id: idAlumno, data });
            return alumnoUpdated;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async setActivo({ idAlumno, idUser, userRole, data }) {
        try {

            await this.getAlumnoById({ idAlumno, userRole, idUser });

            if (data.alumnoActivo === true) {
                await this.desactivarOtrosAlumnosDelDocente({ docenteId: idUser, alumnoActualId: idAlumno });
            }

            const alumnoUpdated = await this._alumnoRepository.update({ id: idAlumno, data });
            return alumnoUpdated;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async desactivarOtrosAlumnosDelDocente({ docenteId, alumnoActualId }) {

        const alumnosActivos = await this._alumnoRepository.getAll({ docenteAsignado: docenteId, alumnoActivo: true });

        const promises = alumnosActivos
            .filter((alumno) => alumno._id.toString() !== alumnoActualId)
            .map((alumno) => this._alumnoRepository.update({ id: alumno._id, data: { alumnoActivo: false } }));

        await Promise.all(promises);
    };

    async getAndCheckAlumno({ idAlumno }) {
        try {

            isValidMongoDBID(idAlumno);

            const alumno = await this._alumnoRepository.getById({ id: idAlumno });
            checkIfObjectExists({ object: alumno, type: false, objectType: 'Alumno' });

            return alumno;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

}

export default AlumnoService;