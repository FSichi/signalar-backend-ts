import GenericRepository from './GenericRepository.js'
import { PLeccionModel } from "../database/models/index.js";

class ProgresoLeccionRepository extends GenericRepository {

    constructor() {
        super(PLeccionModel);
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

}

export default ProgresoLeccionRepository;