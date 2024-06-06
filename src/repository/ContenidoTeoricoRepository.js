import GenericRepository from "./GenericRepository.js";
import { CTModel } from "../database/models/index.js";

import { handleDatabaseError } from "../messages/ErrorHandlers.js";

class ContenidoTeoricoRepository extends GenericRepository {

    constructor() {
        super(CTModel)
    }

    async getAllCTLeccion({ teoriaIds }) {
        try {
            const contenidosTeoricos = await this.getAll({ _id: { $in: teoriaIds } });
            return contenidosTeoricos;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

}

export default ContenidoTeoricoRepository;