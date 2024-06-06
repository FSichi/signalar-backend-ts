import GenericRepository from './GenericRepository.js'
import { PSeccionModel } from "../database/models/index.js";

class ProgresoSeccionRepository extends GenericRepository {

    constructor() {
        super(PSeccionModel);
    }

    async getAllByAlumno({ alumnoId }) {
        try {
            const progresoAlumno = await this.getAll({ alumno: alumnoId });
            return progresoAlumno;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

}

export default ProgresoSeccionRepository;