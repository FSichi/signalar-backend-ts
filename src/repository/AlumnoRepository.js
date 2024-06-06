import GenericRepository from "./GenericRepository.js";
import { AlumnoModel } from '../database/models/index.js'
import { handleDatabaseError } from "../messages/ErrorHandlers.js";

const populateSchema = 'docenteAsignado';

class AlumnoRepository extends GenericRepository {

    constructor() {
        super(AlumnoModel);
    }

    async getAllAlumnos() {
        try {
            const listOfAlumnos = await AlumnoModel.find().populate(populateSchema, 'nombreCompleto');
            return listOfAlumnos;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

    async getById({ id }) {
        try {
            const alumno = await AlumnoModel.findById(id).populate(populateSchema, 'nombreCompleto');
            return alumno;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

    async createAlumno({ data }) {
        try {
            const alumnoCreated = await AlumnoModel.create(data);
            await alumnoCreated.populate(populateSchema, 'nombreCompleto');
            return alumnoCreated;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

    async updateAlumno({ id, data }) {
        try {
            const alumnoUpdated = await AlumnoModel.findByIdAndUpdate(id, data, { new: true }).populate(populateSchema, 'nombreCompleto');
            return alumnoUpdated;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }


}

export default AlumnoRepository;