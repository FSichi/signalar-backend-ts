import {
    UsuarioModel,
    RoleModel,
    AlumnoModel,
    CentroModel,
    SeccionModel,
    LeccionModel,
} from '../database/models/index.js'

export const esRoleValido = async (rol = 'PARTICULAR_ROLE') => {
    const existeRol = await RoleModel.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

export const emailExiste = async (correo = '') => {
    const existeEmail = await UsuarioModel.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
}

export const existeUsuarioPorId = async (id) => {
    const existeUsuario = await UsuarioModel.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}

export const existeAlumnoPorId = async (id) => {
    const existeAlumno = await AlumnoModel.findById(id);
    if (!existeAlumno) {
        throw new Error(`No existe ningun alumno con id = ${id}`);
    }
}

export const existeCentroPorId = async (id) => {
    const existeCentro = await CentroModel.findById(id);
    if (!existeCentro) {
        throw new Error(`No existe ningun centro educativo con id = ${id}`);
    }
}

export const existeSeccionPorId = async (id) => {
    const existeSeccion = await SeccionModel.findById(id);
    if (!existeSeccion) {
        throw new Error(`No existe ninguna seccion con id = ${id}`);
    }
}

export const existeLeccionPorId = async (id) => {
    const existeLeccion = await LeccionModel.findById(id);
    if (!existeLeccion) {
        throw new Error(`No existe ninguna leccion con id = ${id}`);
    }
}



export default {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeAlumnoPorId,
    existeCentroPorId,
    existeSeccionPorId,
    existeLeccionPorId,
}