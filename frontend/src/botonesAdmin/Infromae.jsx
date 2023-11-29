import { useState } from 'react';
import TablaEncues from './TablaInfo.jsx';
import ResultadosEncues from './Resultados.jsx';

const CambioInfor = () => {
  const [inicio, setInicio] = useState(false);
  const [final, setFinal] = useState(false);
  const [formularioSeleccionado, setFormularioSeleccionado] = useState(false);

  const onCambio = () => {
    setFinal(!final);
    setInicio(!inicio);
  }

  const handleFormularioSeleccionado = (seleccionado) => {
    setFormularioSeleccionado(seleccionado);
  };

  return (
    <div>
      {inicio || <TablaEncues onFormularioSeleccionado={handleFormularioSeleccionado} />}
      <button onClick={onCambio} disabled={!formularioSeleccionado}>
        {!inicio ? 'continuar' : 'volver'}
      </button>
      {!final || <ResultadosEncues />}
    </div>
  );
}

export default CambioInfor;
