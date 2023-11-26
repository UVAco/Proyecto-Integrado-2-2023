import { useState, useEffect } from "react";
import "./DiseñoPaginaEstudiante.css";
import { useNavigate, useLocation } from "react-router-dom";

const FormEstudi = () => {
  const navigate = useNavigate();
  const queryparams = new URLSearchParams(useLocation().search);
  const cedula = queryparams.get("user");
  const [questionsCerradas, setQuestionsCerradas] = useState([]);
  const [questionsAbiertas, setQuestionsAbiertas] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCerradas = await fetch(
          "http://127.0.0.1:5010/usuario/obtenerPreguntasYRespuestasCerradas",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseAbiertas = await fetch(
          "http://127.0.0.1:5010/usuario/datosPreguntasAbiertas",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (responseCerradas.ok && responseAbiertas.ok) {
          const dataCerradas = await responseCerradas.json();
          const dataAbiertas = await responseAbiertas.json();

          setQuestionsCerradas(dataCerradas.preguntasCerradas);
          setQuestionsAbiertas(dataAbiertas.preguntasAbiertas);
        } else {
          console.error(
            "Error en la solicitud:",
            responseCerradas.statusText || responseAbiertas.statusText
          );
        }
      } catch (error) {
        console.error("Error al procesar la respuesta:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (questionId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: value,
    }));
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    console.log("Submit button clicked");

    const respuestasCerradasCompletas = questionsCerradas.every((question) => {
      const answerText = formData[question.id_pregunta];
      return answerText !== undefined && answerText !== null;
    });

    const respuestasAbiertasCompletas = questionsAbiertas.every((question) => {
      const answerText = formData[question.id_pregunta];
      return (
        answerText !== undefined &&
        answerText !== null &&
        answerText.trim() !== ""
      );
    });

    if (!respuestasCerradasCompletas) {
      console.error(
        "Falta seleccionar una respuesta para todas las preguntas cerradas."
      );
      return;
    }

    if (!respuestasAbiertasCompletas) {
      console.error(
        "Falta llenar todas las respuestas para las preguntas abiertas."
      );
      return;
    }

    insertarRespuestas();
    navigate("/");
  };

  const insertarRespuestas = async () => {
    for (const question of questionsCerradas) {
      const answerText = formData[question.id_pregunta];
      if (answerText) {
        await insertarRespuestaCerrada(answerText, question.id_pregunta);
      }
    }

    for (const question of questionsAbiertas) {
      const answerText = formData[question.id_pregunta];
      if (answerText) {
        await insertarRespuestaAbierta(answerText, question.id_pregunta);
      }
    }
  };

  const insertarRespuestaCerrada = async (texto, id_preguntas) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5010/usuario/insertarRespuestaCerrada",
        {
          method: "POST",
          body: JSON.stringify({ texto, cedula, id_preguntas }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Datos incorrectos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  const insertarRespuestaAbierta = async (texto, id_preguntas) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5010/usuario/insertarRespuestaAbierta",
        {
          method: "POST",
          body: JSON.stringify({ texto, id_preguntas, cedula }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Datos incorrectos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  return (
    <div className="container">
      <>
        <p>Responde las siguientes preguntas</p>
      </>
      <section className="form-section">
        <form onSubmit={onSubmit}>
          {questionsCerradas.map((question, idx) => (
            <div key={`group-${question.id_pregunta}`}>
              <h3>
                {idx + 1}. {question.pregunta}
              </h3>
              {question.respuestas.map((respuesta, idxRespuesta) => (
                <div key={`respuesta-${idxRespuesta}`}>
                  <input
                    type="radio"
                    name={`pregunta-${question.id_pregunta}`}
                    value={respuesta}
                    onChange={(e) =>
                      handleInputChange(question.id_pregunta, e.target.value)
                    }
                  />
                  {respuesta}
                </div>
              ))}
            </div>
          ))}

          {questionsAbiertas.map((question, idx) => (
            <div
              key={`group-${question.id_pregunta + questionsCerradas.length}`}
            >
              <h3>
                {questionsCerradas.length + idx + 1}. {question.pregunta}
              </h3>
              <div>
                <input
                  type="text"
                  name={`pregunta-${question.id_pregunta}`}
                  value={formData[question.id_pregunta] || ""}
                  onChange={(e) =>
                    handleInputChange(question.id_pregunta, e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <button className="sendInfo" type="submit">
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
};

export default FormEstudi;
