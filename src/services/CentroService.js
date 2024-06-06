import CentroRepository from "../repository/CentroRepository.js";
import { checkIfObjectExists, isValidMongoDBID } from "../helpers/index.js";
import { handleProcessError } from "../messages/ErrorHandlers.js";

class CentroService {

    constructor() {
        this._centroRepository = new CentroRepository();
    }

    async getAllCentros() {
        try {
            const listOfCentros = await this._centroRepository.getAll();
            return listOfCentros;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async getCentroById({ id }) {
        try {

            isValidMongoDBID(id);

            const centro = await this._centroRepository.getById({ id: id });
            checkIfObjectExists({ object: centro, type: false, objectType: 'Centro' });

            return centro;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async createCentro({ data }) {
        try {
            const centro = await this._centroRepository.create({ data: data });
            return centro;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async updateCentro({ id, data }) {
        try {

            isValidMongoDBID(id);
            await this.getCentroById({ id: id });

            const updatedCentro = await this._centroRepository.update({ id: id, data: data });
            return updatedCentro;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

}

export default CentroService;