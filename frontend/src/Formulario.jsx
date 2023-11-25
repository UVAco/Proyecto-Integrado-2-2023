import  { useState, useEffect } from 'react';
import './DiseñoPaginaEstudiante.css';

const FormEstudi = () => {
  const [questionsCerradas, setQuestionsCerradas] = useState([]);
  const [questionsAbiertas, setQuestionsAbiertas] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCerradas = await fetch('http://127.0.0.1:5010/usuario/obtenerPreguntasYRespuestasCerradas', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const responseAbiertas = await fetch('http://127.0.0.1:5010/usuario/datosPreguntasAbiertas', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (responseCerradas.ok && responseAbiertas.ok) {
          const dataCerradas = await responseCerradas.json();
          const dataAbiertas = await responseAbiertas.json();

          setQuestionsCerradas(dataCerradas.preguntasCerradas);
          setQuestionsAbiertas(dataAbiertas.preguntasAbiertas);
        } else {
          console.error('Error en la solicitud:', responseCerradas.statusText || responseAbiertas.statusText);
        }
      } catch (error) {
        console.error('Error al procesar la respuesta:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (questionId, value) => {
    setFormData({
      ...formData,
      [questionId]: value,
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    // Tu lógica para manejar la submisión del formulario, puedes utilizar formData
  };

  return (
    <div className="container">
      <>
        <h1>App Quiz</h1>
        <p>Responde las siguientes preguntas</p>
      </>
      <section>
        <form onSubmit={onSubmit}>
          {questionsCerradas.map((question, idx) => (
            <div key={`group-${question.id_pregunta}`}>
              <h3>
                {idx + 1}. {question.pregunta}
              </h3>
              {question.respuestas.map((respuesta, idx) => (
                <div key={`respuesta-${idx}`}>
                  <input
                    type="radio"
                    name={`pregunta-${question.id_pregunta}`} 
                    value={respuesta}
                  />
                  {respuesta}
                </div>
              ))}
            </div>
          ))}
          {questionsAbiertas.map((question, idx) => (
            <div key={`group-${question.id_pregunta + questionsCerradas.length}`}>
              <h3>
                {questionsCerradas.length + idx + 1}. {question.pregunta}
              </h3>
              <div>
                <input
                  type="text"
                  name={`pregunta-${question.id_pregunta}`}
                  value={formData[question.id_pregunta] || ''}
                  onChange={(e) => handleInputChange(question.id_pregunta, e.target.value)}
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
