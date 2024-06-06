import { Router } from 'express';
import { check } from 'express-validator';
import ContenidoMaterialController from '../controllers/ContenidoMaterialController.js';

import { validarCampos, esAdminRole, validarJWT } from '../middlewares/index.js';
import { Area, Dificultad, Recurso } from '../database/enums/index.js';

const router = Router();
const controller = new ContenidoMaterialController();


/*  ------------------------------ COLECCION - CONTENIDO TEORICO ------------------------------ */

/* Me retorna todo el Contenido Teorico asociado a una leccion */
router.get('/teoria/get-leccion/:leccionId', [
    validarJWT,
], controller.getAllContenidoTeoricoLeccion);

/* Me retorna un Contenido Teorico */
router.get('/teoria/:id', [
    validarJWT,
], controller.getOneContenidoTeorico);

/* Crea un Nuevo ContenidoTeorico */
router.post("/teoria", [
    validarJWT,
    esAdminRole,
    check('tema', 'El Tema es Obligatorio').not().isEmpty(),
    check('body', 'El Cuerpo del Tema es Obligatorio').not().isEmpty(),
    validarCampos
], controller.createContenidoTeorico);

/* Actualiza un ContenidoTeorico */
router.put("/teoria", [
    validarJWT,
    esAdminRole,
    check('_id', 'El id del CT es obligatorio').not().isEmpty(),
    check('tema', 'El Tema es Obligatorio').not().isEmpty(),
    check('body', 'El Cuerpo del Tema es Obligatorio').not().isEmpty(),
    validarCampos
], controller.updateContenidoTeorico);

/* Elimina un ContenidoTeorico */
router.delete("/teoria", [
    validarJWT,
    esAdminRole,
    check('_id', 'El id del CT es obligatorio').not().isEmpty(),
    validarCampos
], controller.deleteContenidoTeorico);


/*  ------------------------------ COLECCION - CONTENIDO PRACTICO ------------------------------ */

/* Me retorna todo el Contenido Teorico asociado a una leccion */
router.get('/practica/get-leccion/:leccionId', [
    validarJWT,
], controller.getAllContenidoPracticoLeccion);

/* Me retorna un Contenido Practico */
router.get('/practica/:id', [
    validarJWT,
], controller.getOneContenidoPractico);

/* Crea un Nuevo ContenidoPractico */
router.post("/practica", [
    validarJWT,
    esAdminRole,
    check('gifs', 'El/Los Gifs son Obligatorios').not().isEmpty(),
    check('recurso', 'El Recurso del CP es Obligatorio').not().isEmpty(),
    check('recurso', 'No es un Recurso Valido').isIn([
        Recurso.AHORCADITO, Recurso.COINCIDENCIA, Recurso.MEMORIA, Recurso.RULETA, Recurso.UNIR
    ]),
    validarCampos
], controller.createContenidoPractico);

/* Actualiza un ContenidoPractico */
router.put("/practica", [
    validarJWT,
    esAdminRole,
    check('_id', 'El id del CP es obligatorio').not().isEmpty(),
    check('gifs', 'El/Los Gifs son Obligatorios').not().isEmpty(),
    check('recurso', 'El Recurso del CP es Obligatorio').not().isEmpty(),
    validarCampos
], controller.updateContenidoPractico);

/* Elimina un ContenidoPractico */
router.delete("/practica", [
    validarJWT,
    esAdminRole,
    check('_id', 'El id del CP es obligatorio').not().isEmpty(),
    validarCampos
], controller.deleteContenidoPractico);

export default router;