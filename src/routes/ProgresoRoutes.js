import { Router } from 'express';
import { check } from 'express-validator';
import ProgresoController from '../controllers/ProgresoController.js';

import { validarCampos, validarJWT } from '../middlewares/index.js';
import { ProgresoEvaluacion } from '../database/enums/index.js';

const router = Router();
const controller = new ProgresoController();

/*  ------------------------------ COLECCION - PROGRESO LECCION------------------------------ */

/* Me retorna todo el Progreso de Lecciones asociados a un Alumno */
router.get('/leccion/alumno/:alumnoId', [
    validarJWT,
], controller.getAllProgresoLeccionByAlumnoId);

/* Me retorna un Progreso de Leccion por ID */
router.get('/leccion/:id', [
    validarJWT,
], controller.getOneProgresoLeccion);

/* Crea un Nuevo ProgresoLeccion */
router.post("/leccion", [
    validarJWT,
    check('alumno', 'El Alumno asociado es obligatorio').not().isEmpty(),
    check('leccion', 'La Leccion Asociada al progreso es obligatoria').not().isEmpty(),
    check('progreso', 'El Progreso es obligatorio y pertenecer a [PENDIENTE - COMPLETADO]').not().isEmpty().isIn([
        ProgresoEvaluacion.PENDIENTE, ProgresoEvaluacion.COMPLETADO
    ]),
    check('teoria', 'El Progreso de la teoria es obligatorio y debe ser un booleano').not().isEmpty().isBoolean(),
    check('practica', 'El Progreso de la practica es obligatorio y debe ser un booleano').not().isEmpty().isBoolean(),
    validarCampos
], controller.createProgresoLeccion);

/* Actualizar un ProgresoLeccion */
router.put("/leccion", [
    validarJWT,
    check('_id', 'El id del registro de Progreso de Leccion es obligatorio').not().isEmpty(),
    check('progreso', 'El Progreso es obligatorio y pertenecer a [PENDIENTE - COMPLETADO]').not().isEmpty().isIn([
        ProgresoEvaluacion.PENDIENTE, ProgresoEvaluacion.COMPLETADO
    ]),
    check('teoria', 'El Progreso de la teoria es obligatorio y debe ser un booleano').not().isEmpty().isBoolean(),
    check('practica', 'El Progreso de la practica es obligatorio y debe ser un booleano').not().isEmpty().isBoolean(),
    validarCampos
], controller.updateProgresoLeccion);

/* Finalizar el progreso de un ProgresoLeccion */
router.put("/leccion/finish", [
    validarJWT,
    check('_id', 'El id del registro de Progreso de Leccion es obligatorio').not().isEmpty(),
    validarCampos
], controller.finishProgresoLeccion);


/*  ------------------------------ COLECCION - PROGRESO SECCION------------------------------ */

/* Me retorna todo el Progreso de Secciones asociados a un Alumno */
router.get('/seccion/alumno/:alumnoId', [
    validarJWT,
], controller.getAllProgresoSeccionByAlumnoId);

/* Me retorna un Progreso de Seccion por ID */
router.get('/seccion/:id', [
    validarJWT,
], controller.getOneProgresoSeccion);

/* Crea un Nuevo ProgresoSeccion */
router.post("/seccion", [
    validarJWT,
    check('alumno', 'El Alumno asociado es obligatorio').not().isEmpty(),
    check('seccion', 'La Seccion Asociada al progreso es obligatoria').not().isEmpty(),
    check('progreso', 'El Progreso es obligatorio y pertenecer a [PENDIENTE - COMPLETADO]').not().isEmpty().isIn([
        ProgresoEvaluacion.PENDIENTE, ProgresoEvaluacion.COMPLETADO
    ]),
    check('leccionesCompletadas', 'El numero de lecciones completadas es obligatorio y debe ser un Numero').not().isEmpty().isNumeric(),
    validarCampos
], controller.createProgresoSeccion);

/* Actualizar un ProgresoSeccion */
router.put("/seccion", [
    validarJWT,
    check('_id', 'El id del registro de Progreso de Leccion es obligatorio').not().isEmpty(),
    check('progreso', 'El Progreso es obligatorio y pertenecer a [PENDIENTE - COMPLETADO]').not().isEmpty().isIn([
        ProgresoEvaluacion.PENDIENTE, ProgresoEvaluacion.COMPLETADO
    ]),
    check('leccionesCompletadas', 'El numero de lecciones completadas es obligatorio y debe ser un Numero').not().isEmpty().isNumeric(),
    validarCampos
], controller.updateProgresoSeccion);

/* Finalizar el progreso de un ProgresoSeccion */
router.put("/seccion/finish", [
    validarJWT,
    check('_id', 'El id del registro de Progreso de Seccion es obligatorio').not().isEmpty(),
    validarCampos
], controller.finishProgresoSeccion);


/*  ------------------------------ COLECCION - PROGRESO EVALUACION------------------------------ */

/* Me retorna todo el Progreso de Evaluaciones asociados a un Alumno */
router.get('/evaluacion/alumno/:alumnoId', [
    validarJWT,
], controller.getAllProgresoEvaluacionByAlumnoId);

/* Me retorna un Progreso de Evaluacion por ID */
router.get('/evaluacion/:id', [
    validarJWT,
], controller.getOneProgresoEvaluacion);

/* Crea un Nuevo ProgresoEvaluacion */
router.post("/evaluacion", [
    validarJWT,
    check('alumno', 'El Alumno asociado es obligatorio').not().isEmpty(),
    check('evaluacion', 'La Evaluacion Asociada al progreso es obligatoria').not().isEmpty(),
    check('progreso', 'El Progreso es obligatorio y pertenecer a [PENDIENTE - COMPLETADO]').not().isEmpty().isIn([
        ProgresoEvaluacion.PENDIENTE, ProgresoEvaluacion.COMPLETADO, ProgresoEvaluacion.DESAPROBADO
    ]),
    validarCampos
], controller.createProgresoEvaluacion);

/* Actualizar un ProgresoEvaluacion */
router.put("/evaluacion", [
    validarJWT,
    check('_id', 'El id del registro de Progreso de Leccion es obligatorio').not().isEmpty(),
    check('progreso', 'El Progreso es obligatorio y pertenecer a [PENDIENTE - COMPLETADO]').not().isEmpty().isIn([
        ProgresoEvaluacion.PENDIENTE, ProgresoEvaluacion.COMPLETADO, ProgresoEvaluacion.DESAPROBADO
    ]),
    validarCampos
], controller.updateProgresoEvaluacion);

/* Finalizar el progreso de un ProgresoEvaluacion */
router.put("/evaluacion/finish", [
    validarJWT,
    check('_id', 'El id del registro de Progreso de Evaluacion es obligatorio').not().isEmpty(),
    validarCampos
], controller.finishProgresoEvaluacion);


/*  ------------------------------ COLECCION - PROGRESO ALUMNO------------------------------ */

/* Me retorna un Progreso de Alumno por ID del Alumno*/
router.get('/alumno/:idAlumno', [
    validarJWT,
], controller.getOneProgresoAlumno);

/* Crea un Nuevo ProgresoAlumno */
router.post("/alumno", [
    validarJWT,
    check('alumno', 'El Alumno asociado es obligatorio').not().isEmpty(),
    validarCampos
], controller.createProgresoAlumno);

/* Actualizar un ProgresoAlumno */
router.put("/alumno", [
    validarJWT,
    check('_id', 'El id del registro de Progreso de Alumno es obligatorio').not().isEmpty(),
    validarCampos
], controller.updateProgresoAlumno);


/* Crea y Retorna un Historial Completo del Alumno por ID */
// router.get('/alumno/history-report/:idAlumno', [
//     validarJWT,
// ], controller.getHistoryReportAlumno);

export default router;