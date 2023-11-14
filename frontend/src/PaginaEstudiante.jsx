import useState from 'react';
import './DiseñoPaginaEstudiante.css';

function PaginaEstudiante() {
  const [respuestas, setRespuestas] = useState({
    pregunta1: '',
    pregunta2: '',
    pregunta3: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespuestas({
      ...respuestas,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar las respuestas al servidor o realizar cualquier otra acción necesaria
  };

  return (
    <div className="encuesta-estudiante">
      <h1>Encuesta para Estudiantes</h1>
      <form onSubmit={handleSubmit}>
        <div className="pregunta">
          <label htmlFor="pregunta1">Pregunta 1:</label>
          <input
            type="text"
            id="pregunta1"
            name="pregunta1"
            value={respuestas.pregunta1}
            onChange={handleChange}
          />
        </div>
        <div className="pregunta">
          <label htmlFor="pregunta2">Pregunta 2:</label>
          <input
            type="text"
            id="pregunta2"
            name="pregunta2"
            value={respuestas.pregunta2}
            onChange={handleChange}
          />
        </div>
        <div className="pregunta">
          <label htmlFor="pregunta3">Pregunta 3:</label>
          <input
            type="text"
            id="pregunta3"
            name="pregunta3"
            value={respuestas.pregunta3}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Enviar Respuestas</button>
      </form>
    </div>
  );
}

export default PaginaEstudiante;
