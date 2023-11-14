import './DiseñoPaginaAdmin.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CreateForm from './botones/Encuesta.jsx';
import CreateUsuario from './botones/CreateUsu.jsx';


function PaginaAdmin() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState(false);
  const [activeEncu, setActiveEncu] = useState(false);
  const [activeUsu, setActiveUsu] = useState(false);
  const [activeInfor, setActiveInfor] = useState(false);
  const [activeAler, setActiveAler] = useState(false);

  const onActiveForm =  () => {
    setActiveForm(!activeForm);
  }

  const onActiveEncu=  () => {
    setActiveEncu(!activeEncu);
  }

  const onActiveInfor=  () => {
    setActiveInfor(!activeInfor);
  }

  const onActiveUse=  () => {
    setActiveUsu(!activeUsu);
  }
  const onActiveAler=  () => {
    setActiveAler(!activeAler);
  }
  const [administradorData, setAdministradorData] = useState({
    nombre: '',
    apellido: '',
    rol: '',
  });

 
  useEffect(() => {
    // Realiza la solicitud para obtener datos del administrador al cargar el componente
    fetchDataAdministrador();
  }, []);



  const fetchDataAdministrador = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5010/usuario/datosAdministrador', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        // Actualiza el estado con los datos del administrador
        setAdministradorData(data[0]); // Suponiendo que la consulta devuelve solo un administrador
      } else {
        console.error('Error al obtener datos del administrador');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleCerrarSesion = () => {
    navigate('/');
}

  return (
    
    <div className="pagina-admin">
      <div className="sidebar">
        <div className="logo">
        </div>
        <div className="botones">
          <button onClick={onActiveForm}>Formularios</button>
          <button onClick={onActiveEncu}>Editar Encuestas</button>
          <button onClick={onActiveUse}> Mostar Usuarios</button>
          <button onClick={onActiveInfor}>Mostrar Informes</button>
          <button onClick={onActiveAler}>Mostrar Alertas</button>
        </div>
        <div className="salir">
          <button onClick={handleCerrarSesion}>Cerrar sesion</button>
        </div>
      </div>
      <div className="contenido">
        <>
        <tr>
        <td><h2>Bienvenido {administradorData.rol}</h2></td>
        <td><p>{administradorData.nombre}</p></td>
        <td><p>{administradorData.apellido}</p></td>
        </tr>
        </>
        { !activeForm||<CreateForm />}
        { !activeUsu||<CreateUsuario />}
        </div>
    </div>
  );
}

export default PaginaAdmin;
