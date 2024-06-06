import ContenidoMaterialService from "../services/ContenidoMaterialService.js";
import { handleErrorResponse, handleSuccessResponse } from "../messages/HTTPResponse.js";

class ContenidoMaterialController {

    constructor() {
        this._service = new ContenidoMaterialService();
    }

    getAllContenidoTeoricoLeccion = async (req, res) => {

        const { leccionId } = req.params;

        try {
            const contenidoTeorico = await this._service.getAllCTLeccion({ idLeccion: leccionId });
            handleSuccessResponse(res, 200, contenidoTeorico);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    getOneContenidoTeorico = async (req, res) => {

        const { id } = req.params;

        try {
            const contenidoTeorico = await this._service.getOneCT({ id });
            handleSuccessResponse(res, 200, contenidoTeorico);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    createContenidoTeorico = async (req, res) => {

        const { tema, body: content, ...body } = req.body;

        const data = {
            tema,
            body: content,
            ...body
        }

        try {
            const contenidoTeorico = await this._service.createCT({ data });
            handleSuccessResponse(res, 201, contenidoTeorico);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    updateContenidoTeorico = async (req, res) => {

        const { _id, tema, body: content, ...body } = req.body;

        const data = {
            _id,
            tema,
            body: content,
            ...body
        }

        try {
            const contenidoTeorico = await this._service.updateCT({ id: _id, data });
            handleSuccessResponse(res, 200, contenidoTeorico);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    deleteContenidoTeorico = async (req, res) => {

        const { _id } = req.body;

        try {
            const contenidoTeorico = await this._service.deleteCT({ id: _id });
            handleSuccessResponse(res, 200, contenidoTeorico);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    

    getAllContenidoPracticoLeccion = async (req, res) => {

        const { leccionId } = req.params;

        try {
            const contenidoPractico = await this._service.getAllCPLeccion({ idLeccion: leccionId });
            handleSuccessResponse(res, 200, contenidoPractico);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    getOneContenidoPractico = async (req, res) => {

        const { id } = req.params;

        try {
            const contenidoPractico = await this._service.getOneCP({ id });
            handleSuccessResponse(res, 200, contenidoPractico);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    createContenidoPractico = async (req, res) => {

        const { gifs, recurso, ...body } = req.body;

        const data = {
            gifs,
            recurso,
            ...body
        }

        try {
            const contenidoPractico = await this._service.createCP({ data });
            handleSuccessResponse(res, 201, contenidoPractico);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    updateContenidoPractico = async (req, res) => {

        const { _id, gifs, recurso, ...body } = req.body;

        const data = {
            _id,
            gifs,
            recurso,
            ...body
        }

        try {
            const contenidoPractico = await this._service.updateCP({ id: _id, data });
            handleSuccessResponse(res, 200, contenidoPractico);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    deleteContenidoPractico = async (req, res) => {

        const { _id } = req.body;

        try {
            const contenidoPractico = await this._service.deleteCP({ id: _id });
            handleSuccessResponse(res, 200, contenidoPractico);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

}

export default ContenidoMaterialController;