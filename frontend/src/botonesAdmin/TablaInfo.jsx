import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';

const TablaEncues = ({ onFormularioSeleccionado }) => {
  const queryparams = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const user = queryparams.get('user');
  const [selectedRow, setSelectedRow] = useState('');
  const [estudianteData, setEstudianteData] = useState([]);
  const [formSelected, setFormSelected] = useState(false);
  const idEncuesta = queryparams.get('idEncuesta');

  useEffect(() => {
    setFormSelected(false);
    datosFormularios();
  }, []);

  const handleRowClick = async (row) => {
    setSelectedRow(row.id);
    setFormSelected(true);
    onFormularioSeleccionado(true);
    idFormulario(row.titulo);
  };

  const idFormulario = async (titulo) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5010/usuario/idFormularios?titulo=${encodeURIComponent(titulo)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        const { rows } = await response.json();
  
        if (rows && rows.length > 0 && rows[0].id) {
          const idFormulario = rows[0].id;
          navigate(`/admin?user=${user}&idEncuesta=${idEncuesta}&Formulario=${idFormulario}`);
        } else {
          console.error('Error: No se encontró el ID del formulario en la respuesta del servidor:', response);
        }
      } else {
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  

  const datosFormularios = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:5010/usuario/datosFormularios',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const { rows } = await response.json();
        setEstudianteData(rows);
      } else {
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <>
      <div className="containercenter">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Titulo</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            {estudianteData.map((row) => (
              <tr key={row.id} onClick={() => handleRowClick(row)}>
                <td>
                  <input
                    type="radio"
                    name="selectedRow"
                    value={row.id}
                    checked={selectedRow === row.id}
                    readOnly
                  />
                </td>
                <td>{row.titulo}</td>
                <td>{row.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

TablaEncues.propTypes = {
  onFormularioSeleccionado: PropTypes.func.isRequired,
};

export default TablaEncues;
