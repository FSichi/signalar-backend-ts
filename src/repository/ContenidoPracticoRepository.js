import GenericRepository from "./GenericRepository.js";
import { CPModel } from "../database/models/index.js";

import { handleDatabaseError } from "../messages/ErrorHandlers.js";

class ContenidoPracticoRepository extends GenericRepository{

    constructor(){
        super(CPModel)
    }

    async getAllCPLeccion({ practicaIds }) {
        try {
            const contenidosTeoricos = await this.getAll({ _id: { $in: practicaIds } });
            return contenidosTeoricos;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

}

export default ContenidoPracticoRepository;