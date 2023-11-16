import { Router } from "express";
import { usuarioController } from "../controller/usuario.js";
const router = Router();

router.post('/datosAdministrador', usuarioController.datosAdministrador)
router.post('/insertaDatosPreguntas', usuarioController.insertarDatosPreguntas)
router.post('/insertarDatosEncuesta', usuarioController.insertarDatosEncuesta)
router.post('/login', usuarioController.login);

export default router;