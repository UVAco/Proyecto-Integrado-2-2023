import { useState } from 'react';
import '../DiseñoPaginaAdmin.css';

const CreateUsuario = () => {
 const [nombre, setNombre] = useState('');
 const [apellido, setApellido] = useState('');
 const [email, setEmail] = useState('');
 const [contraseña, setContraseña] = useState('');
 const [nacimiento, setNacimiento] = useState('');
 const [cedula, setCedula] = useState('');
 const [genero, setGenero] = useState('');
 const [programa, setPrograma] = useState('');
 const [personas, setPersonas] = useState([]);

 const crear = (e) => {
    e.preventDefault();
    const nuevaPersona = { nombre, apellido, email, contraseña, nacimiento, cedula, genero, programa};
    setPersonas([...personas, nuevaPersona]);
 };

 const limpiar = () =>{
    setNombre('');
    setApellido('');
    setEmail('');
    setContraseña('');
    setNacimiento('');
    setCedula('');
    setGenero('');
    setPrograma('');
 }

 const botonAgregar = () => {
    fetchDataEstudiantes();
    limpiar();
 };

 const fetchDataEstudiantes = async () => {
    
    try {
      const response = await fetch('http://127.0.0.1:5010/usuario/insertarDatosEstudiantes', {
        method: 'POST',
        body: JSON.stringify({ nombre, apellido, email, contraseña, nacimiento, cedula, genero, programa }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const botonEditar = () => {
    editarEstudiantes();
    limpiar();
  };

  const editarEstudiantes = async () => {
    
    try {
      const response = await fetch('http://127.0.0.1:5010/usuario/editarDatosEstudiantes', {
        method: 'PUT',
        body: JSON.stringify({ nombre, apellido, email, contraseña, nacimiento, genero, programa, cedula}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

 return (
    <div className="container">
        <form onSubmit={crear} >
      <div >
      <div className="row">
        <div className="col">
        <div className="col">Nombre</div>
        <input className="controlatt"
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        /></div>
        <div className="col">
        <div className="col">Apellido</div>
        <input className="controlatt"
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        /></div>
        <div className="w-100"></div>
        <div className="col">
        <div className="col">Email</div>
        <input className="controlatt"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /></div>
        <div className="col">
        <div className="col">Contraseña</div>
        <input className="controlatt"
            type="text"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
        /></div>
         <div className="w-100"></div>
         <div className="col">
         <div className="col">Fecha nacimiento</div>
        <input className="controlatt"
          type="text"
          placeholder="AÑO-MES-DIA"
          value={nacimiento}
          onChange={(e) => setNacimiento(e.target.value)}
        /></div>
        <div className="col">
        <div className="col">Celuda</div>
        <input className="controlatt"
          type="text"
          placeholder="Cedula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        /></div>
        <div className="w-100"></div>
        <div className="col">
        <div className="col">Genero</div>   
        <input className="controlatt"
          type="text"
          placeholder="Genero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        /></div>
        <div className="col"> 
        <div className="col">Programa</div>
        <input className="controlatt"
          type="text"
          placeholder="Programa"
          value={programa}
          onChange={(e) => setPrograma(e.target.value)}
        /></div>
        <div className="w-100"></div>
        <div className="col"> 
        <button type="submit"  className='btn'  onClick={botonAgregar}>Agregar</button>
        </div>
        <div className="col">
            <button type="button" className='btn' onClick={botonEditar}>Editar</button>
            </div>    
      </div> 
      
      </div></form>

      
    </div>
 );
};

export default CreateUsuario;