import CreateForm from './Encuesta.jsx';
import Appes from './Preguntas.jsx';
import  { useState } from 'react';

const Cambio = () =>{
    const  [inicio, setInicio] = useState(false);
    const  [final, setFinal] = useState(false);

    const onCambio =  () => {
        setFinal(!final);
        setInicio(!inicio);
      }
    return(
        <div>{ inicio||<CreateForm/>}
            <button onClick={onCambio}>{!inicio ? 'agregar preguntas': 'volver a encabezado'}</button>
            { !final||<Appes/>}
        </div>
    )
}
export default Cambio;