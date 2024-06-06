import SeccionRepository from "../repository/SeccionRepository.js";
import LeccionRepository from "../repository/LeccionRepository.js";
import EvaluativoRepository from "../repository/EvaluativoRepository.js";

import { handleProcessError } from "../messages/ErrorHandlers.js";
import { checkIfObjectExists, isValidMongoDBID } from "../helpers/helperFunctions.js";

class MaterialService {

    constructor() {
        this._seccionRepository = new SeccionRepository();
        this._leccionRepository = new LeccionRepository();
        this._evaluativoRepository = new EvaluativoRepository();
    }

    async getAllSecciones() {
        try {
            const listOfSecciones = await this._seccionRepository.getAll();
            return listOfSecciones;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    };

    async getAllSeccionesWithLeccion() {
        try {
            const listOfSecciones = await this._seccionRepository.getAllSeccionesWithLeccion();
            return listOfSecciones;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async getSeccionById({ id }) {
        try {

            isValidMongoDBID(id);

            const seccion = await this._seccionRepository.getById({ id });
            checkIfObjectExists({ object: seccion, type: false, objectType: 'Seccion' });

            return seccion;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async getSeccionWithLeccion({ id }) {
        try {

            await this.getSeccionById({ id: id });

            const seccionWithLeccion = await this._seccionRepository.getSeccionWithLeccion({ id });
            checkIfObjectExists({ object: seccionWithLeccion, objectId: id, objectType: 'Seccion', type: true });

            return seccionWithLeccion[0];

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async createSeccion({ data }) {
        try {
            const seccionCreated = await this._seccionRepository.create({ data });
            return seccionCreated;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async updateSeccion({ seccionId, data }) {
        try {

            await this.getSeccionById({ id: seccionId });

            const seccionUpdated = await this._seccionRepository.update({ id: seccionId, data });
            return seccionUpdated;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }



    async getAllLecciones() {
        try {
            const listOfLecciones = await this._leccionRepository.getAll();
            return listOfLecciones;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async getAllLeccionesWithContent() {
        try {
            const listOfLecciones = await this._leccionRepository.getAllLeccionesWithContent();
            return listOfLecciones;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async getLeccionById({ id }) {
        try {

            isValidMongoDBID(id);

            const leccion = await this._leccionRepository.getById({ id });
            checkIfObjectExists({ object: leccion, type: false, objectType: 'Leccion' });

            return leccion;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async getLeccionWithContent({ id }) {
        try {

            await this.getLeccionById({ id: id });

            const leccionWithContent = await this._leccionRepository.getLeccionWithContent({ id });
            checkIfObjectExists({ object: leccionWithContent, objectId: id, objectType: 'Leccion', type: true });

            return leccionWithContent[0];

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async createLeccion({ data }) {
        try {

            await this.getSeccionById({ id: data.seccion });

            const leccionCreated = await this._leccionRepository.create({ data });
            return leccionCreated;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async updateLeccion({ leccionId, data }) {
        try {

            await this.getLeccionById({ id: leccionId });
            await this.getSeccionById({ id: data.seccion });

            const leccionUpdated = await this._leccionRepository.update({ id: leccionId, data });
            return leccionUpdated;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }



    async getAllEvaluativos() {
        try {
            const listOfEvaluativos = await this._evaluativoRepository.getAll();
            return listOfEvaluativos;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async getAllEvaluativosWithContent() {
        try {
            const listOfEvaluativos = await this._evaluativoRepository.getAllEvaluativosWithContent();
            return listOfEvaluativos;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async getEvaluativoById({ id }) {
        try {

            isValidMongoDBID(id);

            const evaluativo = await this._evaluativoRepository.getById({ id });
            checkIfObjectExists({ object: evaluativo, type: false, objectType: 'Evaluativo' });

            return evaluativo;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async getEvaluativoWithContent({ id }) {
        try {

            await this.getEvaluativoById({ id: id });

            const evaluativoWithContent = await this._evaluativoRepository.getEvaluativoWithContent({ id });
            checkIfObjectExists({ object: evaluativoWithContent, objectId: id, objectType: 'Evaluativo', type: true });

            return evaluativoWithContent[0];

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async createEvaluativo({ data }) {
        try {

            await this.getLeccionById({ id: data.leccion });

            const evaluativoCreated = await this._evaluativoRepository.create({ data });
            return evaluativoCreated;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async updateEvaluativo({ evaluativoId, data }) {
        try {

            await this.getEvaluativoById({ id: evaluativoId });
            await this.getLeccionById({ id: data.leccion });

            const evaluativoUpdated = await this._evaluativoRepository.update({ id: evaluativoId, data });
            return evaluativoUpdated;

        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

}

export default MaterialService;