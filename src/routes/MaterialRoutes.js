import { Router } from 'express';
import { check } from 'express-validator';
import MaterialController from '../controllers/MaterialController.js';

import { validarCampos, esAdminRole, validarJWT } from '../middlewares/index.js';
import { Area, Dificultad, EstadoContenido } from '../database/enums/index.js';

const router = Router();
const controller = new MaterialController();

/*  ------------------------------ COLECCION - SECCIONES ------------------------------ */

/* Me retorna todas las Secciones */
router.get("/seccion", [
    validarJWT,
], controller.getAllSecciones);

/* Me retorna una Seccion Especifica -> QueryParam: ?lecciones = [ 'true' - 'false' ]*/
router.get("/seccion/:seccionId", [
    validarJWT,
], controller.getSeccion);

/* Crear una Nueva Seccion */
router.post('/seccion', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre de la seccion es obligatorio').not().isEmpty(),
    check('area', 'No es un Area Valida').isIn([Area.CNATURALES, Area.CSOCIALES, Area.MATEMATICAS, Area.LENGUA]),
    check('cantLecciones', 'La cantidad de lecciones es Obligatoria y debe ser un Numero').not().isEmpty().isInt(),
    validarCampos
], controller.createSeccion);

/* Actualizar Seccion Por Id */
router.put('/seccion', [
    validarJWT,
    esAdminRole,
    // check('_id').custom(existeSeccionPorId),
    check('_id', 'El ID de la seccion es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre de la seccion es obligatorio').not().isEmpty(),
    check('area', 'No es un Area Valida').isIn([Area.CNATURALES, Area.CSOCIALES, Area.MATEMATICAS, Area.LENGUA]),
    check('cantLecciones', 'La cantidad de lecciones es Obligatoria y debe ser un Numero').not().isEmpty().isInt(),
    check('estado', 'No es un Estado Valido').not().isEmpty().isIn([EstadoContenido.ACTIVO, EstadoContenido.INACTIVO]),
    validarCampos
], controller.updateSeccion);


/*  ------------------------------ COLECCION - LECCIONES ------------------------------ */

/* Me retorna todas las Lecciones -> QueryParam: ?contenido = [ 'true' - 'false' ] */
router.get("/leccion", [
    validarJWT,
], controller.getAllLecciones);

/* Me retorna una Leccion Especifica -> QueryParam: ?contenido = [ 'true' - 'false' ] */
router.get("/leccion/:leccionId", [
    validarJWT,
], controller.getLeccion);

/* Crear una Nueva Leccion */
router.post('/leccion', [
    validarJWT,
    esAdminRole,
    check('seccion', 'La Seccion Padre es Obligatoria').not().isEmpty(),
    check('nombre', 'El nombre de la leccion es obligatorio').not().isEmpty(),
    check('dificultad', 'La dificultad no es valida').not().isEmpty().isIn([Dificultad.BAJA, Dificultad.MEDIA, Dificultad.ALTA]),
    check('cantRecursos', 'La cantidad de recursos debe ser un numero').not().isEmpty().isInt(),
    validarCampos
], controller.createLeccion);

/* Actualizar Leccion Por Id */
router.put('/leccion', [
    validarJWT,
    esAdminRole,
    check('_id', 'El ID de la Leccion es obligatorio').not().isEmpty(),
    check('seccion', 'La Seccion Padre es Obligatoria').not().isEmpty(),
    check('nombre', 'El nombre de la leccion es obligatorio').not().isEmpty(),
    check('dificultad', 'La dificultad no es valida').not().isEmpty().isIn([Dificultad.BAJA, Dificultad.MEDIA, Dificultad.ALTA]),
    check('cantRecursos', 'La cantidad de recursos debe ser un numero').not().isEmpty().isInt(),
    // check('estado', 'No es un Estado Valido').not().isEmpty().isIn([EstadoContenido.ACTIVO, EstadoContenido.INACTIVO]),
    validarCampos
], controller.updateLeccion);


/*  ------------------------------ COLECCION - EVALUATIVOS ------------------------------ */

/* Me retorna todos los Evaluativos -> QueryParam: ?contenido = [ 'true' - 'false' ] */
router.get("/evaluativo", [
    validarJWT,
    esAdminRole,
], controller.getAllEvaluativos);

/* Me retorna un Evaluativo Especifico -> QueryParam: ?contenido = [ 'true' - 'false' ] */
router.get("/evaluativo/:evaluativoId", [
    validarJWT,
    esAdminRole,
], controller.getEvaluativo);

/* Crear un Nuevo Evaluativo */
router.post('/evaluativo', [
    validarJWT,
    esAdminRole,
    check('leccion', 'La leccion Asociada es obligatoria').not().isEmpty(),
    check('nombreSeccion', 'El nombre de la seccion a la que pertenece es obligatorio').not().isEmpty(),
    check('area', 'El area no es valida').not().isEmpty().isIn([Area.CNATURALES, Area.CSOCIALES, Area.MATEMATICAS, Area.LENGUA]),
    validarCampos
], controller.createEvaluativo);

/* Actualizar Evaluativo Por Id */
router.put('/evaluativo', [
    validarJWT,
    esAdminRole,
    check('_id', 'El ID del Evaluativo es obligatorio').not().isEmpty(),
    check('leccion', 'La leccion Asociada es obligatoria').not().isEmpty(),
    check('nombreSeccion', 'El nombre de la seccion a la que pertenece es obligatorio').not().isEmpty(),
    check('area', 'El area no es valida').not().isEmpty().isIn([Area.CNATURALES, Area.CSOCIALES, Area.MATEMATICAS, Area.LENGUA]),
    validarCampos
], controller.updateEvaluativo);

export default router;