import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CreateUsuario from './botonesAdmin/CreateUsu.jsx';
import Cambio from './botonesAdmin/CrearPregunta.jsx';

function PaginaAdmin() {
  const navigate = useNavigate();
  const queryparams = new URLSearchParams(useLocation().search);
  const user = queryparams.get('user');
  const [activeForm, setActiveForm] = useState(false);
  const [activeEncu, setActiveEncu] = useState(false);
  const [activeUsu, setActiveUsu] = useState(false);
  const [activeInfor, setActiveInfor] = useState(false);
  const [activeAler, setActiveAler] = useState(false);
  const [administradorData, setAdministradorData] = useState({
    nombre: '',
    apellido: '',
    rol: '',
    user: '',
  });

  const onActiveForm = () => {
    setActiveForm(!activeForm);
  };

  const onActiveEncu = () => {
    setActiveEncu(!activeEncu);
  };

  const onActiveInfor = () => {
    setActiveInfor(!activeInfor);
  };

  const onActiveUse = () => {
    setActiveUsu(!activeUsu);
  };

  const onActiveAler = () => {
    setActiveAler(!activeAler);
  };

  useEffect(() => {
    fetchDataAdministrador();
  }, []);

  const fetchDataAdministrador = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5010/usuario/datosAdministrador', {
        method: 'POST',
        body: JSON.stringify({ user }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.rows && data.rows.length > 0) {
          setAdministradorData(data.rows[0]);
        } else {
          console.error('No se encontraron datos del administrador');
        }
      } else {
        console.error(`Error al obtener datos del administrador: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleCerrarSesion = () => {
    navigate('/');
  };

  return (
    <div className="pagina-admin">
      <div className="sidebar">
        <div className="logo"></div>
        <div className="botones">
          <button onClick={onActiveForm}>Formularios</button>
          <button onClick={onActiveEncu}>Editar Encuestas</button>
          <button onClick={onActiveUse}>Mostrar Usuarios</button>
          <button onClick={onActiveInfor}>Mostrar Informes</button>
          <button onClick={onActiveAler}>Mostrar Alertas</button>
        </div>
        <div className="salir">
          <button onClick={handleCerrarSesion}>Cerrar sesión</button>
        </div>
      </div>
      <div className="contenido">
        <>
          <tr>
            <tr>
              <td colSpan="3">
                <h2>
                  Bienvenido {administradorData.rol} {administradorData.nombre}{' '}
                  {administradorData.apellido}
                </h2>
              </td>
            </tr>
          </tr>
        </>
        {!activeForm || <Cambio />}
        {!activeUsu || <CreateUsuario />}
      </div>
    </div>
  );
}

export default PaginaAdmin;
