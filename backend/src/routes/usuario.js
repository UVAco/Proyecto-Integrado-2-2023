import { Router } from "express";
import { usuarioController } from "../controller/usuario.js";
const router = Router();

//router.get('/datosAdministrador', usuarioController.datosAdministrador)
//router.post('/obtenerIdAdministrador', usuarioController.obtenerIdAdministrador)
router.post('/insertarDatosEncuesta', usuarioController.insertarDatosEncuesta)
router.post('/login', usuarioController.login);

export default router;