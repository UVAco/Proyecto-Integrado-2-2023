import { Router } from "express";
import { usuarioController } from "../controller/usuario.js";
const router = Router();

router.post("/datosAdministrador", usuarioController.datosAdministrador);
router.post(
  "/insertaRespuestaPreguntaCerrada",
  usuarioController.insertaRespuestaPreguntaCerrada
);
router.post("/insertaDatosPreguntas", usuarioController.insertarDatosPreguntas);
router.post("/insertarDatosEncuesta", usuarioController.insertarDatosEncuesta);
router.post("/login", usuarioController.login);
router.post(
  "/insertarDatosEstudiantes",
  usuarioController.insertarDatosEstudiantes
);
router.post(
  "/insertarRespuestaCerrada",
  usuarioController.insertarRespuestaCerrada
);
router.post(
  "/insertarRespuestaAbierta",
  usuarioController.insertarRespuestaAbierta
);

router.get("/datosFormularios", usuarioController.datosFormularios);
router.get("/datosPreguntaCerradas", usuarioController.datosPreguntas);
router.get("/datosEstudiantes", usuarioController.datosEstudiantes);
router.get(
  "/obtenerPreguntasYRespuestasCerradas",
  usuarioController.datosPreguntasCerradas
);
router.get("/datosPreguntasAbiertas", usuarioController.datosPreguntasAbiertas);
router.get(
  "/datosFormulariosActivados",
  usuarioController.datosFormulariosActivados
);
router.get("/emailUsuarios", usuarioController.emailUsuarios);
router.get("/cedulaUsuarios", usuarioController.cedulaUsuarios);
router.get(
  "/datosEstudiantesFormulario",
  usuarioController.datosEstudiantesFormulario
);
router.get(
  "/respuestaAbiertaEstudiante",
  usuarioController.respuestaAbiertaEstudiante
);
router.get("/idFormularios", usuarioController.idFormularios);
router.get(
  "/datosPreguntasRespuestasAbiertas",
  usuarioController.datosPreguntasRespuestasAbiertas
);
router.get(
  "/datosPreguntasRespuestasCerradas",
  usuarioController.datosPreguntasRespuestasCerradas
);

router.put("/editarDatosEstudiantes", usuarioController.editarDatosEstudiantes);
router.put(
  "/editarEstadosFormulariosIndividuales",
  usuarioController.editarEstadosFormulariosIndividuales
);
router.put(
  "/editarEstadosFormularios",
  usuarioController.editarEstadosFormularios
);
router.put(
  "/editarEstadosFormulariosActivados",
  usuarioController.editarEstadosFormulariosActivados
);

router.delete("/eliminarEstudiantes", usuarioController.eliminarEstudiantes);

export default router;
