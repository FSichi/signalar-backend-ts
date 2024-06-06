import mongoose from "mongoose";
import GenericRepository from "./GenericRepository.js";
import { SeccionModel } from "../database/models/index.js";

import { getAggregateForSeccions } from "../database/aggregate/index.js";
import { handleDatabaseError } from "../messages/ErrorHandlers.js";

class SeccionRepository extends GenericRepository {

    constructor() {
        super(SeccionModel);
    }

    async getAllSeccionesWithLeccion() {
        try {
            const seccionesWithLeccion = await this.aggregate({ pipeline: getAggregateForSeccions({ type: 'ALL' }) });
            return seccionesWithLeccion;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

    async getSeccionWithLeccion({ id }) {
        try {
            const seccionId = new mongoose.Types.ObjectId(id); // Convertir a ObjectId
            const seccionWithLeccion = await this.aggregate({ pipeline: getAggregateForSeccions({ type: 'ONE', seccionId: seccionId }) });
            return seccionWithLeccion;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

}

export default SeccionRepository;