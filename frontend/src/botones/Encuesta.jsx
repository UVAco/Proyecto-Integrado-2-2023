import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const CreateForm = () => {
  const queryparams = new URLSearchParams(useLocation().search);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const user = queryparams.get('user');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      titulo: title,
      descripcion: description,
      user: user,
    };

    try {
      const response = await axios.post('http://127.0.0.1:5010/usuario/insertarDatosEncuesta', newTask);
      console.log("datosnewTask", response.data);
      setTitle('');
      setDescription('');
      user('');
      alert('Encuesta creada con éxito');
    } catch (err) {
      console.error(err.response.data);
      alert('Error al crear la encuesta');
    }
  };

  return (
    <div>
      <h1>Crear Encuesta</h1>
      <form onSubmit={handleSubmit}>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Descripción:</label>
        <textarea
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
