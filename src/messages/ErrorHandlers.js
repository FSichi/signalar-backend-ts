export const handleDatabaseError = ({ status, error }) => {
    throw { status: status || 500, message: error };
};

export const handleProcessError = ({ status, error }) => {
    throw { status: status || 500, message: error };
};