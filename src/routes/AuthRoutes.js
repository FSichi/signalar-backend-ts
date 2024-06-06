import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos, validarJWT } from '../middlewares/index.js';
import AuthController from "../controllers/AuthController.js";

const router = Router();
const controller = new AuthController();

/* Login */
router.post("/login", [
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo debe de ser un string').isString(),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El Password es obligatorio').not().isEmpty(),
    check('password', 'El Password debe de ser un string').isString(),
    check('password', 'El Password debe contener entre 6 y 15 Caracteres').isLength({ min: 6, max: 15 }),
    validarCampos
], controller.login);

/* Validar y revalidar token */
router.get("/renew", [
    validarJWT
], controller.renewToken);

/* Cambiar Contraseña */
router.put('/change-password', [
    check('correo', 'El Correo no es valido').not().isEmpty().isEmail(),
    check('password', 'El Password debe contener entre 6 y 15 Caracteres').not().isEmpty().isLength({ min: 6, max: 15 }),
    validarCampos
], controller.updateUserPassword);

export default router;