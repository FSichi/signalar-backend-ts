export const handleResponse = (res, status, data = {}, error = null) => {

    const response = error
        ? { status: "FAILED", error: error.message || error }
        : { status: "OK", data };

    res.status(status).json(response);
};

export const handleSuccessResponse = (res, status, data = {}) => {
    handleResponse(res, status, data);
};

export const handleErrorResponse = (res, error) => {
    handleResponse(res, error.status || 500, null, error);
};

export const handleErrorLogin = (res, error) => {
    res.status(error.status || 500)
        .json({ status: "FAILED", data: { authenticated: false, error: error?.message || error } });
};

export default {
    handleSuccessResponse,
    handleErrorResponse,
    handleErrorLogin,
};