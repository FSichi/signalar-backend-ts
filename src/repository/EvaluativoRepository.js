import mongoose from "mongoose";
import GenericRepository from "./GenericRepository.js";
import { EvaluativoModel } from "../database/models/index.js";

import { handleDatabaseError } from "../messages/ErrorHandlers.js";
import { getAggregateForEvaluativos } from "../database/aggregate/index.js";

class EvaluativoRepository extends GenericRepository {

    constructor() {
        super(EvaluativoModel);
    }

    async getAllEvaluativosWithContent() {
        try {
            const evaluativosWithContent = await this.aggregate({ pipeline: getAggregateForEvaluativos({ type: 'ALL' }) });
            return evaluativosWithContent;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

    async getEvaluativoWithContent({ id }) {
        try {
            const evaluativoId = new mongoose.Types.ObjectId(id); // Convertir a ObjectId
            const evaluativoWithContent = await this.aggregate({ pipeline: getAggregateForEvaluativos({ type: 'ONE', evaluativoId: evaluativoId }) });
            return evaluativoWithContent;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

}

export default EvaluativoRepository;