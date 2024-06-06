import { CentroModel } from "../database/models/index.js";
import GenericRepository from "./GenericRepository.js";

class CentroRepository extends GenericRepository {

    constructor() {
        super(CentroModel);
    }

}

export default CentroRepository;