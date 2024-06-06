import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos, esAdminRole, dbValidators, validarJWT, tieneRole } from '../middlewares/index.js';
import UserController from "../controllers/UserController.js";
import { UserRoles } from '../database/enums/index.js';

const router = Router();
const controller = new UserController();

/* Me retorna todos los Usuarios  -> QueryParam: ?ficha = [ 'true' - 'false' ]*/
router.get("/", [
    validarJWT,
    esAdminRole,
], controller.getAllUsers);

/* Me retorna un Usuario Especifico -> QueryParam: ?ficha = [ 'true' - 'false' ]*/
router.get("/:userId", [
    validarJWT,
    esAdminRole,
], controller.getUserById);

/* Crear un Nuevo Usuario */
router.post('/', [
    validarJWT,
    check('nombreCompleto', 'El nombre es obligatorio y debe ser un String').isString().notEmpty(),
    check('password', 'El Password debe contener entre 6 y 15 Caracteres').isLength({ min: 6, max: 15 }),
    check('img', 'La imagen es obligatoria y debe ser un String').isString().notEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(dbValidators.emailExiste),
    check('rol').custom(dbValidators.esRoleValido),
    validarCampos
], controller.createUserWithFicha);

/* Actualizar Usuario  */
router.put('/', [
    validarJWT,
    esAdminRole,
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('nombreCompleto', 'El nombre es obligatorio').not().isEmpty(),
    check('img', 'La imagen es obligatoria').not().isEmpty(),
    validarCampos
], controller.updateUser);

/* Modificar Estado Cuenta del Usuario*/
router.put('/change-status', [
    validarJWT,
    esAdminRole,
    check('_id', 'El id es obligatorio').not().isEmpty(),
    check('estado', 'El campo estado es obligatorio y debe ser un valor Booleano').not().isEmpty().isBoolean(),
    validarCampos
], controller.changeUserStatus);


/* RUTA PARA EL DASHBOARD */
router.get("/dashboard/info", [
    validarJWT,
    tieneRole(UserRoles.ADMIN_ROLE, UserRoles.PROFESIONAL_ROLE),
], controller.getDashboardInfo);


export default router;