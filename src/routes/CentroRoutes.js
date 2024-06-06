import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos, esAdminRole, dbValidators, validarJWT } from '../middlewares/index.js';
import CentroController from "../controllers/CentroController.js";

const router = Router();
const controller = new CentroController();

/* Me retorna todos los Centros Educativos */
router.get("/", [
    validarJWT,
    esAdminRole,
], controller.getAllCentros);

/* Me retorna un Centro Especifico */
router.get("/:centroId", [
    validarJWT,
    esAdminRole,
], controller.getCentroById);

/* Crear un Nuevo Centro */
router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombreCentro', 'El nombre del Centro es obligatorio').not().isEmpty(),
    check('habilitacionSiprosa', 'La Habilitacion del Siprosa es obligatoria').not().isEmpty(),
    check('correo', 'El correo no es válido').not().isEmpty().isEmail(),
    check('telefono', 'El Telefono de Contacto es obligatorio').not().isEmpty(),
    check('cantProfesionales', 'La Cantidad de Profesionales es obligatoria').not().isEmpty(),
    check('cantLicencias', 'La Cantidad de Licencias es obligatoria').not().isEmpty(),
    validarCampos
], controller.createCentro);

/* Actualizar Centro Por Id */
router.put('/', [
    validarJWT,
    esAdminRole,
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('nombreCentro', 'El nombre es obligatorio').not().isEmpty(),
    check('habilitacionSiprosa', 'La Habilitacion del Siprosa es obligatoria').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('telefono', 'El Numero de Contacto es obligatorio').not().isEmpty(),
    check('cantProfesionales', 'La cantidad de profesionales es obligatoria').not().isEmpty(),
    check('cantLicencias', 'La cantidad de licencias es obligatoria').not().isEmpty(),
    validarCampos
], controller.updateCentro);

export default router;