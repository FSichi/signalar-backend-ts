import { handleErrorResponse } from "../messages/HTTPResponse.js";

export const handleJsonSyntaxError = (err, req, res, next) => {

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        handleErrorResponse(res, { status: 400, message: 'JSON mal formado - Formato JSON no permitido / Erroneo' });
    } else {
        next(err);
    }

    return
}

export default handleJsonSyntaxError;