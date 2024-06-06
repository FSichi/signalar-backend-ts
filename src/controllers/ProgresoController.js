import ProgresoService from "../services/ProgresoService.js";
import { handleErrorResponse, handleSuccessResponse } from "../messages/HTTPResponse.js";
import { ProgresoEvaluacion } from "../database/enums/index.js";

class ProgresoController {

    constructor() {
        this._service = new ProgresoService();
    }

    getAllProgresoLeccionByAlumnoId = async (req, res) => {

        const { alumnoId } = req.params;
        const { rol: userRole } = req.usuario;

        try {
            const progreso = await this._service.getAllProgresoLeccionByAlumnoId({ id: alumnoId, userRole });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    getOneProgresoLeccion = async (req, res) => {

        const { id } = req.params;

        try {
            const progreso = await this._service.getOneProgresoLeccion({ id });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    createProgresoLeccion = async (req, res) => {

        const { ...body } = req.body;
        const { rol: userRol } = req.usuario;

        const data = {
            ...body,
            attemptDate: new Date()
        }

        try {
            const newProgreso = await this._service.createProgresoLeccion({ data, userRol });
            handleSuccessResponse(res, 201, newProgreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    updateProgresoLeccion = async (req, res) => {

        const { _id, ...body } = req.body;

        const data = {
            _id,
            ...body,
            attemptDate: new Date()
        }

        try {
            const progreso = await this._service.updateProgresoLeccion({ id: _id, data });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    finishProgresoLeccion = async (req, res) => {

        const { _id } = req.body;

        const data = {
            _id,
            teoria: true,
            practica: true,
            progreso: ProgresoEvaluacion.COMPLETADO,
            attemptDate: new Date()
        }

        try {
            const progreso = await this._service.finishProgresoLeccion({ id: _id, data });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }




    getAllProgresoSeccionByAlumnoId = async (req, res) => {

        const { alumnoId } = req.params;
        const { rol: userRole } = req.usuario;

        try {
            const progreso = await this._service.getAllProgresoSeccionByAlumnoId({ id: alumnoId, userRole });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    getOneProgresoSeccion = async (req, res) => {

        const { id } = req.params;

        try {
            const progreso = await this._service.getOneProgresoSeccion({ id });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    createProgresoSeccion = async (req, res) => {

        const { ...body } = req.body;
        const { rol: userRol } = req.usuario;

        const data = {
            ...body,
            completionDate: null
        }

        try {
            const newProgreso = await this._service.createProgresoSeccion({ data, userRol });
            handleSuccessResponse(res, 201, newProgreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    updateProgresoSeccion = async (req, res) => {

        const { _id, ...body } = req.body;

        const data = {
            _id,
            ...body
        }

        try {
            const progreso = await this._service.updateProgresoSeccion({ id: _id, data });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    finishProgresoSeccion = async (req, res) => {

        const { _id } = req.body;

        const data = {
            _id,
            progreso: ProgresoEvaluacion.COMPLETADO,
            completionDate: new Date()
        }

        try {
            const progreso = await this._service.finishProgresoSeccion({ id: _id, data });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }




    getAllProgresoEvaluacionByAlumnoId = async (req, res) => {

        const { alumnoId } = req.params;
        const { rol: userRole } = req.usuario;

        try {
            const progreso = await this._service.getAllProgresoEvaluacionByAlumnoId({ id: alumnoId, userRole });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    getOneProgresoEvaluacion = async (req, res) => {

        const { id } = req.params;

        try {
            const progreso = await this._service.getOneProgresoEvaluacion({ id });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    createProgresoEvaluacion = async (req, res) => {

        const { ...body } = req.body;
        const { rol: userRol } = req.usuario;

        const data = {
            ...body,
            attemptDate: new Date()
        }

        try {
            const newProgreso = await this._service.createProgresoEvaluacion({ data, userRol });
            handleSuccessResponse(res, 201, newProgreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    updateProgresoEvaluacion = async (req, res) => {

        const { _id, ...body } = req.body;

        const data = {
            _id,
            ...body,
            attemptDate: new Date()
        }

        try {
            const progreso = await this._service.updateProgresoEvaluacion({ id: _id, data });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    finishProgresoEvaluacion = async (req, res) => {

        const { _id } = req.body;

        const data = {
            _id,
            progreso: ProgresoEvaluacion.COMPLETADO,
            attemptDate: new Date()
        }

        try {
            const progreso = await this._service.finishProgresoEvaluacion({ id: _id, data });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }




    getOneProgresoAlumno = async (req, res) => {

        const { idAlumno } = req.params;

        try {
            const progreso = await this._service.getOneProgresoAlumno({ id: idAlumno });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    createProgresoAlumno = async (req, res) => {

        const { ...body } = req.body;
        const { rol: userRol } = req.usuario;

        const data = { ...body }

        try {
            const newProgreso = await this._service.createProgresoAlumno({ data, userRol });
            handleSuccessResponse(res, 201, newProgreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    updateProgresoAlumno = async (req, res) => {

        const { _id, ...body } = req.body;

        const data = { _id, ...body }

        try {
            const progreso = await this._service.updateProgresoAlumno({ id: _id, data });
            handleSuccessResponse(res, 200, progreso);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }



    getHistoryReportAlumno = async (req, res) => {

        const { idAlumno } = req.params;
        const { rol: userRole } = req.usuario;

        try {
            const historyReport = await this._service.getHistoryReportAlumno({ id: idAlumno, userRole });
            handleSuccessResponse(res, 200, historyReport);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }


}

export default ProgresoController;