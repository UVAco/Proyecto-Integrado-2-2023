import '../DiseñoPaginaAdmin.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Appes = () => {
  const queryparams = new URLSearchParams(useLocation().search);
  const idEncuesta = queryparams.get('idEncuesta');
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [textoAbierto, setTexto] = useState('');
  const [textoCerrado, setTexto2] = useState('');
  const [tipo, setTipo] = useState('');

  const handleSubmit1 = () => {
    setItems((prevItems) => [...prevItems, input]);
    setInput('');
  };

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleCreatePregunta = async (tipoPregunta, e) => {
    e.preventDefault();
    setTipo(tipoPregunta);};

const handleCreatePregunta2 = async (tipoPregunta) => {
    let texto = '';
    if (tipoPregunta === 'abierta') {
      texto = textoAbierto;
    }else{
      texto = textoCerrado;
    }

    const response = await fetch('http://127.0.0.1:5010/usuario/insertaDatosPreguntas', {
      method: 'POST',
      body: JSON.stringify({texto, tipo: tipoPregunta, idEncuesta }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error('Datos incorrectos');
    }
    // Lógica adicional que necesites para crear la pregunta en la BD
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">pregunta abierta</div>
        <div className="col">pregunta cerrada</div>
        <div className="w-100"></div>
        <div className="col">
          <input
            type="text"
            name="question1"
            placeholder="pregunta"
            className="controlatt"
            onChange={(e) => {
              const valor = e.target.value;
              setTexto(valor);
              setTexto2(valor);
            }} 
          />
        </div>
        <div className="col1">
          <input
            type="text"
            name="question2"
            placeholder="Pregunta"
            className="controlatt"
            onChange={(e) => {
              const valor = e.target.value;
              setTexto(valor);
              setTexto2(valor);
            }}
          />
        </div>
        <div className="w-100"></div>
        <div className="col">
          <textarea  />
        </div>
        <div className="col">
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <input type="checkbox" />
                {item}
                <button onClick={() => handleDelete(index)}>Borrar</button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={input}
            placeholder="Respuesta"
            //respuesta de la pregunta cerrada onChange={(e) => setInput(e.target.value)}
            className="controlatt"
          />
          <button onClick={handleSubmit1}>crear</button>
        </div>
        <div className="w-100"></div>
        <div className="col">
        <button onClick={(e) => { handleCreatePregunta('abierta', e); handleCreatePregunta2('abierta'); }}>crear pregunta abierta</button>
        </div>
        <div className="col">
          <button onClick={(e) => {handleCreatePregunta('cerrada',e); handleCreatePregunta2('cerrada'); }}>crear pregunta cerrada</button>
        </div>
      </div>
    </div>
  );
};

export default Appes;
