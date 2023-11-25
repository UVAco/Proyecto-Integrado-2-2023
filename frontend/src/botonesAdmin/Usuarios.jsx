import CreateUsuario from './CreateUsu.jsx';
import UsuarioData from './CrudUsu.jsx';
import  { useState } from 'react';

const CambioPgn = () =>{
    const  [inicio, setInicio] = useState(false);
    const  [final, setFinal] = useState(false);

    const onCambio =  () => {
        setFinal(!final);
        setInicio(!inicio);
      }
    return(
        <div>{ inicio||<UsuarioData />}
            <button 
            onClick={onCambio}>{!inicio ? 'agregar usuario': 'volver'}</button>
            { !final||<CreateUsuario />}
        </div>
    )
}
export default CambioPgn;