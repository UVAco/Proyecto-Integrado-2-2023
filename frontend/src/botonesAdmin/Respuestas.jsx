import { useState, useEffect } from "react";
import "../DiseñopaginaAdmin.css";
import { useLocation } from "react-router-dom";

const RespuestasUsu = () => {
  const queryparams = new URLSearchParams(useLocation().search);
  const id_encuestas = queryparams.get("Formulario");
  const cedula = queryparams.get("Cedula");

  const [preguntasCerradas, setPreguntasCerradas] = useState([]);
  const [preguntasAbiertas, setPreguntasAbiertas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCerradas = await fetch(
          `http://127.0.0.1:5010/usuario/datosPreguntasRespuestasCerradas?id_encuestas=${id_encuestas}&cedula=${cedula}`
        );
        if (responseCerradas.status === 200) {
          const dataCerradas = await responseCerradas.json();
          console.log("Respuestas cerradas:", dataCerradas.preguntas);

          setPreguntasCerradas(dataCerradas.preguntas);
        } else {
          console.error("Datos incorrectos en respuestas cerradas");
        }

        const responseAbiertas = await fetch(
          `http://127.0.0.1:5010/usuario/datosPreguntasRespuestasAbiertas?id_encuestas=${id_encuestas}&cedula=${cedula}`
        );
        if (responseAbiertas.status === 200) {
          const dataAbiertas = await responseAbiertas.json();
          console.log("Respuestas abiertas:", dataAbiertas.respuestasAbiertas);

          setPreguntasAbiertas(dataAbiertas.respuestasAbiertas);
        } else {
          console.error("Datos incorrectos en respuestas abiertas");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [id_encuestas]);

  useEffect(() => {
    console.log("Estado actual de preguntas cerradas:", preguntasCerradas);
    console.log("Estado actual de preguntas abiertas:", preguntasAbiertas);
  }, [preguntasCerradas, preguntasAbiertas]);

  console.log("Respuestas cerradas en el frontend:", preguntasCerradas);

  return (
    <div className="containercenter">
      <>
        <p>Respuestas</p>
      </>
      <form>
        <div className="row">
          <div className="col">
            <div>
              {preguntasCerradas.map((pregunta, idx) => (
                <div key={`group-cerrada-${idx}`}>
                  <h3>
                    {idx + 1}. {pregunta.pregunta}
                  </h3>
                  <p> {pregunta.respuestaUsuario}</p>
                </div>
              ))}
            </div>
            <div>
              {preguntasAbiertas.map((pregunta, idx) => (
                <div key={`group-abierta-${idx}`}>
                  <h3>
                    {idx + 1}. {pregunta.texto}
                  </h3>
                  <p>{pregunta.respuesta}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RespuestasUsu;
