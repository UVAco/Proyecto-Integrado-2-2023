import "./App.css";
import { useNavigate, useLocation } from "react-router-dom";
import "./DiseñoPaginaEstudiante.css";
import { useState, useEffect } from "react";

function PaginaEstudiante() {
  const queryparams = new URLSearchParams(useLocation().search);
  const user = queryparams.get("user");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const datosFormularios = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5010/usuario/datosFormulariosActivados",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const { rows } = await response.json();
        setData(rows);
      } else {
        console.error("Error en la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    datosFormularios();
  }, []);

  const handleCambio = () => {
    navigate(`/form?user=${user}`);
  };

  return (
    <>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Iniciar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elemento) => (
              <tr key={elemento.id}>
                <td>{elemento.titulo}</td>
                <td>{elemento.descripcion}</td>
                <td>
                  <button onClick={handleCambio}>comenzar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PaginaEstudiante;
