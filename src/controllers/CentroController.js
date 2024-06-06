import { handleErrorResponse, handleSuccessResponse } from "../messages/HTTPResponse.js";
import CentroService from "../services/CentroService.js";


class CentroController {

    constructor() {
        this._centroService = new CentroService();
    }

    getAllCentros = async (req, res) => {

        try {

            const listOfCentros = await this._centroService.getAllCentros();
            handleSuccessResponse(res, 200, listOfCentros);

        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

    getCentroById = async (req, res) => {

        const { centroId } = req.params;

        try {

            const centro = await this._centroService.getCentroById({ id: centroId });
            handleSuccessResponse(res, 200, centro);

        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

    createCentro = async (req, res) => {

        const { ...body } = req.body;
        const dataNewCentro = { ...body };

        try {

            const centro = await this._centroService.createCentro({ data: dataNewCentro });
            handleSuccessResponse(res, 201, centro);

        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

    updateCentro = async (req, res) => {

        const { _id, ...body } = req.body;
        const updatedData = { ...body }

        try {

            const centro = await this._centroService.updateCentro({ id: _id, data: updatedData });
            handleSuccessResponse(res, 200, centro);

        } catch (error) {
            handleErrorResponse(res, error);
        }
    };

}

export default CentroController;