import GenericRepository from './GenericRepository.js'
import { PAlumnoModel } from "../database/models/index.js";

class ProgresoAlumnoRepository extends GenericRepository {

    constructor() {
        super(PAlumnoModel);
    }

}

export default ProgresoAlumnoRepository;