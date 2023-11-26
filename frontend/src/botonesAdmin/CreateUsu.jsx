import { useState } from "react";
import "../DiseñoPaginaAdmin.css";

const CreateUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [cedula, setCedula] = useState("");
  const [genero, setGenero] = useState("");
  const [programa, setPrograma] = useState("");
  const [personas, setPersonas] = useState([]);

  const crear = (e) => {
    e.preventDefault();
    const nuevaPersona = {
      nombre,
      apellido,
      email,
      contraseña,
      nacimiento,
      cedula,
      genero,
      programa,
    };
    setPersonas([...personas, nuevaPersona]);
  };

  const limpiar = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setContraseña("");
    setNacimiento("");
    setCedula("");
    setGenero("");
    setPrograma("");
  };

  const validarFecha = (fecha) => {
    const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;
    return formatoFecha.test(fecha);
  };

  const validarEmail = (email) => {
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return formatoEmail.test(email);
  };

  const validarContraseña = (contraseña) => {
    const formatoContraseña = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    return formatoContraseña.test(contraseña);
  };

  const validarTextoSinNumeros = (texto) => {
    const formatoTexto = /^[^\d]+$/;
    return formatoTexto.test(texto);
  };

  const botonAgregar = async () => {
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      email.trim() === "" ||
      contraseña.trim() === "" ||
      nacimiento.trim() === "" ||
      cedula.trim() === "" ||
      genero.trim() === "" ||
      programa.trim() === ""
    ) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    if (
      !validarTextoSinNumeros(nombre) ||
      !validarTextoSinNumeros(apellido) ||
      !validarTextoSinNumeros(genero) ||
      !validarTextoSinNumeros(programa)
    ) {
      alert(
        "El nombre, apellido, genero y programa no deben contener números o símbolos."
      );
      return;
    }

    if (!validarFecha(nacimiento)) {
      alert("El formato de la fecha de nacimiento debe ser AAAA-MM-DD.");
      return;
    }

    if (!validarEmail(email)) {
      alert("Ingrese un correo electrónico válido.");
      return;
    }

    if (!validarContraseña(contraseña)) {
      alert(
        "La contraseña debe tener al menos una letra mayúscula, un símbolo y un número."
      );
      return;
    }

    const cedulasExistente = await cedulaUsuario();
    const emailsExistente = await emailUsuario();

    if (cedulasExistente.includes(cedula)) {
      alert(
        "La cédula ingresada ya existe. Por favor, ingrese una cédula diferente."
      );
      return;
    }

    if (emailsExistente.includes(email)) {
      alert(
        "El correo electrónico ingresado ya existe. Por favor, ingrese un correo electrónico diferente."
      );
      return;
    }

    fetchDataEstudiantes();
    limpiar();
  };

  const fetchDataEstudiantes = async () => {
    try {
      await fetch("http://127.0.0.1:5010/usuario/insertarDatosEstudiantes", {
        method: "POST",
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          contraseña,
          nacimiento,
          cedula,
          genero,
          programa,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const botonEditar = async () => {
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      email.trim() === "" ||
      contraseña.trim() === ""
    ) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const cedulasExistentes = await cedulaUsuario();

    if (!cedulasExistentes.includes(cedula)) {
      alert(
        "La cédula ingresada no existe. Por favor, ingrese una cédula existente."
      );
      return;
    }

    editarEstudiantes();
    limpiar();
  };

  const editarEstudiantes = async () => {
    try {
      await fetch("http://127.0.0.1:5010/usuario/editarDatosEstudiantes", {
        method: "PUT",
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          contraseña,
          nacimiento,
          genero,
          programa,
          cedula,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const cedulaUsuario = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5010/usuario/cedulaUsuarios",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        const cedulasExistentes = data.rows.map((row) => row.cedula);
        console.log("Cédulas existentes:", cedulasExistentes);
        return cedulasExistentes;
      } else {
        console.error("Error en la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const emailUsuario = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5010/usuario/emailUsuarios",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        const emailsExistentes = data.rows.map((row) => row.email);
        console.log("Emails existentes:", emailsExistentes);
        return emailsExistentes;
      } else {
        console.error("Error en la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={crear}>
        <div>
          <div className="row">
            <div className="col">
              <div className="col">Nombre</div>
              <input
                className="controlatt"
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="col">
              <div className="col">Apellido</div>
              <input
                className="controlatt"
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
            <div className="w-100"></div>
            <div className="col">
              <div className="col">Email</div>
              <input
                className="controlatt"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col">
              <div className="col">Contraseña</div>
              <input
                className="controlatt"
                type="text"
                placeholder="Contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
            </div>
            <div className="w-100"></div>
            <div className="col">
              <div className="col">Fecha nacimiento</div>
              <input
                className="controlatt"
                type="text"
                placeholder="AÑO-MES-DIA"
                value={nacimiento}
                onChange={(e) => setNacimiento(e.target.value)}
              />
            </div>
            <div className="col">
              <div className="col">Celuda</div>
              <input
                className="controlatt"
                type="text"
                placeholder="Cedula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
              />
            </div>
            <div className="w-100"></div>
            <div className="col">
              <div className="col">Genero</div>
              <input
                className="controlatt"
                type="text"
                placeholder="Genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              />
            </div>
            <div className="col">
              <div className="col">Programa</div>
              <input
                className="controlatt"
                type="text"
                placeholder="Programa"
                value={programa}
                onChange={(e) => setPrograma(e.target.value)}
              />
            </div>
            <div className="w-100"></div>
            <div className="col">
              <button type="submit" className="btn" onClick={botonAgregar}>
                Agregar
              </button>
            </div>
            <div className="col">
              <button type="button" className="btn" onClick={botonEditar}>
                Editar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUsuario;
