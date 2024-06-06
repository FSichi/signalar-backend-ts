import MaterialService from "../services/MaterialService.js";
import { handleErrorResponse, handleSuccessResponse } from "../messages/HTTPResponse.js";
import { EstadoContenido } from "../database/enums/index.js";

class MaterialController {

    constructor() {
        this._service = new MaterialService();
    }

    getAllSecciones = async (req, res) => {

        const { lecciones } = req.query;

        try {

            const listOfSecciones = (lecciones === 'true')
                ? await this._service.getAllSeccionesWithLeccion()
                : await this._service.getAllSecciones();

            handleSuccessResponse(res, 200, listOfSecciones);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    getSeccion = async (req, res) => {

        const { seccionId } = req.params;
        const { lecciones } = req.query;

        try {
            const seccion = (lecciones === 'true')
                ? await this._service.getSeccionWithLeccion({ id: seccionId })
                : await this._service.getSeccionById({ id: seccionId });

            handleSuccessResponse(res, 200, seccion);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    createSeccion = async (req, res) => {

        const { ...body } = req.body;
        const data = { ...body, estado: EstadoContenido.INACTIVO }

        try {
            const seccionCreated = await this._service.createSeccion({ data: data });
            handleSuccessResponse(res, 201, seccionCreated)
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    updateSeccion = async (req, res) => {

        const { _id, ...body } = req.body;
        const updatedData = { ...body };

        try {
            const seccionUpdated = await this._service.updateSeccion({ seccionId: _id, data: updatedData });
            handleSuccessResponse(res, 200, seccionUpdated)
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }



    getAllLecciones = async (req, res) => {

        const { contenido } = req.query;

        try {

            const listOfLecciones = (contenido === 'true')
                ? await this._service.getAllLeccionesWithContent()
                : await this._service.getAllLecciones();

            handleSuccessResponse(res, 200, listOfLecciones);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    getLeccion = async (req, res) => {

        const { leccionId } = req.params;
        const { contenido } = req.query;

        try {
            const leccion = (contenido === 'true')
                ? await this._service.getLeccionWithContent({ id: leccionId })
                : await this._service.getLeccionById({ id: leccionId });

            handleSuccessResponse(res, 200, leccion);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    createLeccion = async (req, res) => {

        const { ...body } = req.body;
        const data = { ...body, estado: EstadoContenido.INACTIVO }

        try {
            const leccionCreated = await this._service.createLeccion({ data: data });
            handleSuccessResponse(res, 201, leccionCreated)
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    updateLeccion = async (req, res) => {

        const { _id, ...body } = req.body;
        const updatedData = { ...body };

        try {
            const leccionUpdated = await this._service.updateLeccion({ leccionId: _id, data: updatedData });
            handleSuccessResponse(res, 200, leccionUpdated)
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }



    getAllEvaluativos = async (req, res) => {

        const { contenido } = req.query;

        try {

            const listOfEvaluativos = (contenido === 'true')
                ? await this._service.getAllEvaluativosWithContent()
                : await this._service.getAllEvaluativos();

            handleSuccessResponse(res, 200, listOfEvaluativos);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    getEvaluativo = async (req, res) => {

        const { evaluativoId } = req.params;
        const { contenido } = req.query;

        try {
            const evaluativo = (contenido === 'true')
                ? await this._service.getEvaluativoWithContent({ id: evaluativoId })
                : await this._service.getEvaluativoById({ id: evaluativoId });

            handleSuccessResponse(res, 200, evaluativo);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    createEvaluativo = async (req, res) => {

        const { ...body } = req.body;
        const data = { ...body }

        try {
            const evaluativoCreated = await this._service.createEvaluativo({ data: data });
            handleSuccessResponse(res, 201, evaluativoCreated)
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    updateEvaluativo = async (req, res) => {

        const { _id, ...body } = req.body;
        const updatedData = { ...body };

        try {
            const evaluativoUpdated = await this._service.updateEvaluativo({ evaluativoId: _id, data: updatedData });
            handleSuccessResponse(res, 200, evaluativoUpdated)
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

}

export default MaterialController;