import { handleDatabaseError } from "../messages/ErrorHandlers.js";

class GenericRepository {

    constructor(model) {
        this._model = model;
    }

    async getAll(query = {}, options = {}) {
        try {

            if (Object.keys(query).length === 0) {
                return await this._model.find({}, options);
            } else {
                return this._model.find(query, options);
            }

        } catch (error) {
            handleDatabaseError({ status: 500, error: error });
        }
    }

    async getById({ id }) {
        try {
            return await this._model.findById(id);
        } catch (error) {
            handleDatabaseError({ status: 500, error: error });
        }
    }

    async getOne(query = {}) {
        try {
            return await this._model.findOne(query);
        } catch (error) {
            handleDatabaseError({ status: 500, error: error });
        }
    }

    async aggregate({ pipeline }) {
        try {
            return await this._model.aggregate(pipeline);
        } catch (error) {
            handleDatabaseError({ status: 500, error: error });
        }
    }

    async create({ data }) {
        try {
            return await this._model.create(data);
        } catch (error) {
            handleDatabaseError({ status: 500, error: error });
        }
    }

    async update({ id, data }) {
        try {
            return await this._model.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            handleDatabaseError({ status: 500, error: error });
        }
    }

    async delete({ id }) {
        try {
            return await this._model.findByIdAndDelete(id);
        } catch (error) {
            handleDatabaseError({ status: 500, error: error });
        }
    }

}

export default GenericRepository;