import { Router } from 'express';
import { check } from 'express-validator';
import AlumnoController from "../controllers/AlumnoController.js";

import { validarCampos, esAdminRole, dbValidators, validarJWT, tieneRole } from '../middlewares/index.js';
import { EstadoAlumno, GradoHipoacusia, Parentesco, UserRoles } from '../database/enums/index.js';
import { existeUsuarioPorId } from '../middlewares/db-validators.js';

const router = Router();
const controller = new AlumnoController();

/* Me retorna todos los Alumnos - PARA ADMIN ROL */
router.get("/", [
    validarJWT,
    esAdminRole,
], controller.getAllAlumnos);

/* Me retorna todos los Alumnos de un Docente */
router.get("/alumnos-docente", [
    validarJWT,
    tieneRole(UserRoles.ADMIN_ROLE, UserRoles.PROFESIONAL_ROLE),
], controller.getAllAlumnosDocente);

/* Me retorna un Alumno Especifico Por Id*/
router.get("/alumno/:alumnoId", [
    validarJWT,
    tieneRole(UserRoles.ADMIN_ROLE, UserRoles.PROFESIONAL_ROLE),
], controller.getAlumnoById);

/* Me retorna el Alumno Actualmente Activo del Docente */
router.get("/get-active", [
    validarJWT,
    tieneRole(UserRoles.ADMIN_ROLE, UserRoles.PROFESIONAL_ROLE),
], controller.getAlumnoActivo);

/* Crear un Nuevo Alumno */
router.post('/', [
    validarJWT,
    tieneRole(UserRoles.ADMIN_ROLE, UserRoles.PROFESIONAL_ROLE),
    check('nombreCompleto', 'El nombre es obligatorio').not().isEmpty(),
    check('edad', 'La edad es obligatoria').not().isEmpty(),
    check('gradoHipoacusia', 'No es un grado válido').not().isEmpty().isIn([
        GradoHipoacusia.LEVE, GradoHipoacusia.MODERADA, GradoHipoacusia.SEVERA, GradoHipoacusia.PROFUNDA
    ]),
    check('escuela', 'La Escuela es obligatoria').not().isEmpty(),
    check('nombreTutor', 'El Tutor es obligatorio').not().isEmpty(),
    check('parentesco', 'No es un parentesco válido').not().isEmpty().isIn([
        Parentesco.PADRE, Parentesco.MADRE, Parentesco.TUTOR
    ]),
    check('correoTutor', 'El Correo del Tutor no es valido').not().isEmpty().isEmail(),
    check('telefonoTutor', 'El Telefono del Tutor es obligatorio').not().isEmpty(),
    validarCampos
], controller.createAlumno);

/* Actualizar Alumno Por Id */
router.put('/', [
    validarJWT,
    tieneRole(UserRoles.ADMIN_ROLE, UserRoles.PROFESIONAL_ROLE),
    check('_id', 'El ID del alumno es obligatorio').not().isEmpty(),
    check('nombreCompleto', 'El nombre es obligatorio').not().isEmpty(),
    check('edad', 'La edad es obligatoria').not().isEmpty(),
    check('gradoHipoacusia', 'No es un grado válido').not().isEmpty().isIn([
        GradoHipoacusia.LEVE, GradoHipoacusia.MODERADA, GradoHipoacusia.SEVERA, GradoHipoacusia.PROFUNDA
    ]),
    check('escuela', 'La Escuela es obligatoria').not().isEmpty(),
    check('nombreTutor', 'El Tutor es obligatorio').not().isEmpty(),
    check('parentesco', 'No es un parentesco válido').not().isEmpty().isIn([
        Parentesco.PADRE, Parentesco.MADRE, Parentesco.TUTOR
    ]),
    check('correoTutor', 'El correo no es válido').not().isEmpty().isEmail(),
    check('telefonoTutor', 'El Telefono del Tutor es obligatorio').not().isEmpty(),
    check('docenteAsignado', 'Es necesario el Id del docente Asignado').not().isEmpty(),
    check('docenteAsignado').custom(existeUsuarioPorId),
    validarCampos
], controller.updateAlumno);

/* Modificar Estado del Alumno - [ACTIVO / INACTIVO] */
router.put('/change-status', [
    validarJWT,
    tieneRole(UserRoles.ADMIN_ROLE, UserRoles.PROFESIONAL_ROLE),
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('estado', 'No es un estado valido').not().isEmpty().isIn([
        EstadoAlumno.ACTIVO, EstadoAlumno.INACTIVO
    ]),
    validarCampos
], controller.updateAlumnoStatus);

/* Establecer como Alumno Activo  */
router.put('/set-active', [
    validarJWT,
    tieneRole(UserRoles.ADMIN_ROLE, UserRoles.PROFESIONAL_ROLE),
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('alumnoActivo', 'El campo alumnoActivo es obligatorio y debe ser Booleano').not().isEmpty().isBoolean(),
    validarCampos
], controller.setAlumnoActivo);


export default router;