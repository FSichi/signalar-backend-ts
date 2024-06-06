import { handleErrorResponse } from "../messages/HTTPResponse.js";

export const notFoundURL = (req, res, next) => {
    handleErrorResponse(res, { status: 404, message: `Ruta no encontrada: ${req.originalUrl}` });
    next();
};

export default notFoundURL;