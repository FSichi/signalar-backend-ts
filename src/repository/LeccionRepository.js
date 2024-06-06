import mongoose from "mongoose";
import GenericRepository from "./GenericRepository.js";
import { LeccionModel } from "../database/models/index.js";

import { getAggregateForLeccions } from "../database/aggregate/MaterialPipeline.js";
import { handleDatabaseError } from "../messages/ErrorHandlers.js";

class LeccionRepository extends GenericRepository {

    constructor() {
        super(LeccionModel);
    }

    async getAllLeccionesWithContent() {
        try {
            const leccionesWithLeccion = await this.aggregate({ pipeline: getAggregateForLeccions({ type: 'ALL' }) });
            return leccionesWithLeccion;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

    async getLeccionWithContent({ id }) {
        try {
            const leccionId = new mongoose.Types.ObjectId(id); // Convertir a ObjectId
            const leccionWithLeccion = await this.aggregate({ pipeline: getAggregateForLeccions({ type: 'ONE', leccionId: leccionId }) });
            return leccionWithLeccion;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

}

export default LeccionRepository;