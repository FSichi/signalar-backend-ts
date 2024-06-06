import GenericRepository from './GenericRepository.js'
import { PEvaluacionModel } from "../database/models/index.js";

class ProgresoEvaluacionRepository extends GenericRepository {

    constructor() {
        super(PEvaluacionModel);
    }

    async getAllByAlumno({ alumnoId }) {
        try {
            const progresoAlumno = await this.getAll({ alumno: alumnoId });
            return progresoAlumno;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

    async getAllCompletadoByAlumno({ alumnoId }) {
        try {
            const progresoAlumno = await this.getAll({ alumno: alumnoId, progreso: 'COMPLETADO' });
            return progresoAlumno;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

    async getAllPendienteByAlumno({ alumnoId }) {
        try {
            const progresoAlumno = await this.getAll({ alumno: alumnoId, progreso: 'PENDIENTE' || 'DESAPROBADO' });
            return progresoAlumno;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }
}

export default ProgresoEvaluacionRepository;