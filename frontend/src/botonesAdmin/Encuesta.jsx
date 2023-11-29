import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import  "../DiseñopaginaAdmin.css";

const CreateForm = () => {
  const queryparams = new URLSearchParams(useLocation().search);
  const [titulo, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = queryparams.get("user");
  const navigate = useNavigate();
  const idFormulario = queryparams.get("Formulario");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      titulo: titulo,
      descripcion: description,
      user: user,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5010/usuario/insertarDatosEncuesta",
        newTask
      );
      console.log("Solicitud a insertarDatosEncuesta:", response.data);

      const idEncuesta = response.data.idEncuesta2;
      navigate(`/admin?user=${user}&idEncuesta=${idEncuesta}&Formulario=${idFormulario}`);
      // Datos de la encuesta insertados con éxito
      setTitle("");
      setDescription("");
      user("");
      alert("Encuesta creada con éxito");
    } catch (err) {
      console.error(
        "Error en la solicitud a insertarDatosEncuesta:",
        err.response.data ? err.response.data : "No hay datos"
      );
    }
  };

  return (
    <div>
      <h1>Crear Encuesta</h1>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input
          className="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Descripción:</label>
        <textarea className="description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Crear Encuesta</button>
      </form>
    </div>
  );
};

export default CreateForm;
