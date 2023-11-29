import { useState, useEffect } from 'react';
import '../App.css';
import '../DiseñopaginaAdmin.css';
import RespuestasUsu from './Respuestas.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultadosEncues() {
  const queryparams = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const user = queryparams.get('user');
  const idEncuesta = queryparams.get('idEncuesta');
  const idFormulario = queryparams.get('Formulario');
  const [estudianteFormularioData, setEstudianteFormularioData] = useState([]);
  const [activeResul, setActiveResul] = useState([]);

  const onActiveResul = async (index) => {
    if (!activeResul[index]) {
      // Solo si se está abriendo, realizar la navegación
      await obtenerDatosEstudiante(index);
    }

    setActiveResul((prevActiveResul) => {
      const newActiveResul = [...prevActiveResul];
      newActiveResul[index] = !newActiveResul[index];
      return newActiveResul;
    });
  };


  const obtenerDatosEstudiante = async (index) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5010/usuario/datosEstudiantesFormulario",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const { rows } = await response.json();
        setActiveResul(Array(rows.length).fill(false));
        setEstudianteFormularioData(rows);

        if (rows && rows.length > 0 && rows[index].cedula) {
          navigate(`/admin?user=${user}&idEncuesta=${idEncuesta}&Formulario=${idFormulario}&Cedula=${rows[index].cedula}`);
          console.log('Cédula del estudiante:', rows[index].cedula);
        } else {
          console.error('Error: No se encontró el ID del formulario en la respuesta del servidor:', response);
        }
      } else {
        console.error("Error en la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    obtenerDatosEstudiante();
  }, []);

  return (
    <>
      <div className="containercenter">
        <table className="table">
          <thead>
            <tr>
              <th>Cedula</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Respuestas</th>
            </tr>
          </thead>
          <tbody>
            {estudianteFormularioData.map((elemento, index) => (
              <tr key={elemento.id}>
                <td>{elemento.cedula}</td>
                <td>{elemento.nombre}</td>
                <td>{elemento.apellido}</td>
                <td>{elemento.email}</td>
                <td>
                  <button onClick={() => onActiveResul(index)}>
                    {!activeResul[index] ? 'Abrir' : 'Cerrar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {estudianteFormularioData.map((elemento, index) => (
        activeResul[index] && <RespuestasUsu key={elemento.id} data={elemento} />
      ))}
    </>
  );
}

export default ResultadosEncues;
