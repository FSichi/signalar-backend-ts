import mongoose from "mongoose";
import GenericRepository from "./GenericRepository.js";
import { UsuarioModel, FParticularModel, FProfesionalModel } from "../database/models/index.js";
import { getAggregateForUser } from "../database/aggregate/index.js";
import { handleDatabaseError } from "../messages/ErrorHandlers.js";
import { UserRoles } from "../database/enums/index.js";

class UserRepository extends GenericRepository {

    constructor() {
        super(UsuarioModel);
    }

    async getAllUsersWithFicha() {
        try {
            const usersWithFichas = await this.aggregate({ pipeline: getAggregateForUser({ type: 'ALL' }) });
            return usersWithFichas;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

    async getUserWithFichaById({ id }) {
        try {
            const userId = new mongoose.Types.ObjectId(id); // Convertir a ObjectId
            const user = await this.aggregate({ pipeline: getAggregateForUser({ type: 'ONE', userId: userId }) });
            return user;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

    /* ESTE METODO NO DEBERIA EXISTIR - TENGO QUE LLAMAR DIRECTAMENTE A GETONE Y Pasarle el Query */
    async getUserByEmail({ correo }) {
        try {
            const user = await this.getOne({ correo: correo });
            return user;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

    async getUserPassword({ correo }) {
        try {
            const user = await UsuarioModel.findOne({ correo: correo }).select('_id password');
            return user;
        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }

    async createFicha({ rol, data }) {

        let fichaCreated = {};

        try {

            if (rol === UserRoles.PARTICULAR_ROLE) {
                fichaCreated = await FParticularModel.create(data);
            } else if (rol === UserRoles.PROFESIONAL_ROLE) {
                fichaCreated = await FProfesionalModel.create(data);
            }

            return fichaCreated;

        } catch (error) {
            handleDatabaseError({ status: error.status || 500, error: error.message || error });
        }
    }



}

export default UserRepository;