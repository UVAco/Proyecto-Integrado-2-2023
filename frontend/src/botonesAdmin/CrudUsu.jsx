import "../App.css";
import "../DiseñopaginaAdmin.css";
import { useState, useEffect } from "react";

function UsuarioData() {
  const [estudianteData, setEstudianteData] = useState([]);

  const datosEstudiantes = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5010/usuario/datosEstudiantes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const { rows } = await response.json();
        setEstudianteData(rows);
      } else {
        console.error("Error en la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const eliminarEstudiantes = async (cedula) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5010/usuario/eliminarEstudiantes",
        {
          method: "DELETE",
          body: JSON.stringify({ cedula }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      datosEstudiantes();
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    datosEstudiantes();
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
              <th>Fecha Nacimiento</th>
              <th>Genero</th>
              <th>Correo</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {estudianteData.map((elemento) => (
              <tr key={elemento.id}>
                <td>{elemento.cedula}</td>
                <td>{elemento.nombre}</td>
                <td>{elemento.apellido}</td>
                <td>{elemento.fecha_nacimiento}</td>
                <td>{elemento.genero}</td>
                <td>{elemento.email}</td>
                <td>
                  <button onClick={() => eliminarEstudiantes(elemento.cedula)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UsuarioData;
