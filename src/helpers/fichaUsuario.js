import CentroService from "../services/CentroService.js";
import { UserRoles, GradoHipoacusia, Profesiones } from '../database/enums/index.js';

export const checkFichaUsuario = async (rol, ficha) => {

    const response = (rol === UserRoles.PARTICULAR_ROLE)
        ? validarCamposParticular(ficha)
        : await validarCamposProfesional(ficha)

    return {
        fichaStatus: response.fichaStatus,
        errorStatus: response.errorStatus,
        fichaResponse: response.fichaResponse
    };
};

const validarCamposParticular = (ficha) => {

    let fichaStatus = false;
    let errorStatus = { status: 0, message: '' };
    let fichaResponse = {};

    const camposRequeridos = ['edad', 'gradoHipoacusia'];
    const valoresValidos = [GradoHipoacusia.LEVE, GradoHipoacusia.MODERADA, GradoHipoacusia.SEVERA, GradoHipoacusia.PROFUNDA];

    const mensajeError = 'La Ficha del Usuario Particular no tiene los siguientes campos: [edad - gradoHipoacusia]';
    const mensajeErrorValor = 'El Grado de Hipoacusia no es válido. [LEVE - MODERADA - SEVERA - PROFUNDA]';

    if (!validarCampos(camposRequeridos, ficha)) {
        fichaStatus = false;
        errorStatus = createErrorObject(mensajeError);
        return { fichaStatus, errorStatus, fichaResponse }
    }

    if (!validarValor(ficha.gradoHipoacusia, valoresValidos)) {
        fichaStatus = false;
        errorStatus = createErrorObject(mensajeErrorValor);
        return { fichaStatus, errorStatus, fichaResponse }
    }

    fichaStatus = true;

    fichaResponse = {
        edad: ficha.edad,
        gradoHipoacusia: ficha.gradoHipoacusia,
        usuario: ''
    };

    return { fichaStatus, errorStatus, fichaResponse };
};

const validarCamposProfesional = async (ficha) => {

    let fichaStatus = false;
    let errorStatus = { status: 0, message: '' };
    let fichaResponse = {};

    const service = new CentroService();

    const camposRequeridos = ['tipoProfesion', 'matriculaProfesional'];
    const valoresValidos = [Profesiones.FONOAUDIOLOGO, Profesiones.MAESTRO_ESPECIAL, Profesiones.OTRO, Profesiones.PSICOLOGO, Profesiones.TERAPISTA_OCUPACIONAL];
    const mensajeError = 'La Ficha del Usuario Profesional no tiene los siguientes campos: [tipoProfesion - matriculaProfesional]';
    const mensajeErrorValor = 'La Profesión no es válida. [FONOAUDIOLOGO - MAESTRO_ESPECIAL - PSICOLOGO - TERAPISTA_OCUPACIONAL - OTRO]';

    if (!validarCampos(camposRequeridos, ficha)) {
        fichaStatus = false;
        errorStatus = createErrorObject(mensajeError);
        return { fichaStatus, errorStatus, fichaResponse }
    }

    if (!validarValor(ficha.tipoProfesion, valoresValidos)) {
        fichaStatus = false;
        errorStatus = createErrorObject(mensajeErrorValor);
        return { fichaStatus, errorStatus, fichaResponse }
    }

    fichaStatus = true;

    fichaResponse = {
        tipoProfesion: ficha.tipoProfesion,
        matriculaProfesional: ficha.matriculaProfesional,
        usuario: ''
    };

    try {

        if (ficha.centroAsociado) {
            await service.getCentroById({ id: ficha.centroAsociado });
            fichaResponse.centroAsociado = ficha.centroAsociado;
        }

        return { fichaStatus, errorStatus, fichaResponse };

    } catch (error) {
        throw { status: error.status || 500, message: error.message || error };
    }

};

const validarCampos = (camposRequeridos, ficha) => {
    for (const campo of camposRequeridos) {
        if (!(campo in ficha)) {
            return false;
        }
    }
    return true;
};

const validarValor = (valor, valoresValidos) => {
    if (!valoresValidos.includes(valor)) {
        return false;
    }
    return true;
};

const createErrorObject = (msg) => {
    let error = { status: 403, message: msg }
    return error;
}