import ContenidoTeoricoRepository from "../repository/ContenidoTeoricoRepository.js";
import ContenidoPracticoRepository from "../repository/ContenidoPracticoRepository.js";
import MaterialService from "./MaterialService.js";

import { handleProcessError } from "../messages/ErrorHandlers.js";
import { checkIfObjectExists, isValidMongoDBID } from "../helpers/helperFunctions.js";

class ContenidoMaterialService {

    constructor() {
        this._CTrepository = new ContenidoTeoricoRepository();
        this._CPrepository = new ContenidoPracticoRepository();

        this._materialService = new MaterialService();
    }

    async getAllCTLeccion({ idLeccion }) {
        try {

            const leccion = await this._materialService.getLeccionById({ id: idLeccion });
            const teoriaIds = leccion.contenidoLeccion.teoria;

            const listOfContenido = await this._CTrepository.getAllCTLeccion({ teoriaIds });
            return listOfContenido;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async getOneCT({ id }) {
        try {

            isValidMongoDBID(id);

            const contenido = await this._CTrepository.getById({ id });
            checkIfObjectExists({ object: contenido, type: false, objectType: 'ContenidoTeorico' });

            return contenido;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async createCT({ data }) {
        try {
            const contenido = await this._CTrepository.create({ data });
            return contenido;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async updateCT({ id, data }) {
        try {

            await this.getOneCT({ id });

            const contenido = await this._CTrepository.update({ id, data });
            return contenido;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async deleteCT({ id }) {
        try {

            await this.getOneCT({ id });

            const contenido = await this._CTrepository.delete({ id });
            return contenido;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }


    async getAllCPLeccion({ idLeccion }) {
        try {

            const leccion = await this._materialService.getLeccionById({ id: idLeccion });
            const practicaIds = leccion.contenidoLeccion.practica;

            const listOfContenido = await this._CPrepository.getAllCPLeccion({ practicaIds });
            return listOfContenido;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async getOneCP({ id }) {
        try {

            isValidMongoDBID(id);

            const contenido = await this._CPrepository.getById({ id });
            checkIfObjectExists({ object: contenido, type: false, objectType: 'ContenidoPractico' });

            return contenido;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async createCP({ data }) {
        try {
            const contenido = await this._CPrepository.create({ data });
            return contenido;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async updateCP({ id, data }) {
        try {

            await this.getOneCP({ id });

            const contenido = await this._CPrepository.update({ id, data });
            return contenido;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

    async deleteCP({ id }) {
        try {

            await this.getOneCP({ id });

            const contenido = await this._CPrepository.delete({ id });
            return contenido;
        } catch (error) {
            handleProcessError({ status: error.status, error: error.message || '' });
        }
    }

}

export default ContenidoMaterialService;