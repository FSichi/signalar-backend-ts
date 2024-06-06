const logLevels = {
    INFO: 'INFO',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

export const log = ({ level, message }) => {
    // const timestamp = new Date().toISOString();
    // console.log(`[${timestamp}] [${level}] ${message}`);
    console.log(`[${level}]: ${message}`);
};

export const info = (message) => {
    log({ level: logLevels.INFO, message: message });
};

export const success = (message) => {
    log({ level: logLevels.SUCCESS, message: message });
};

export const error = (message) => {
    log({ level: logLevels.ERROR, message: message });
};

export default {
    info,
    success,
    error,
};