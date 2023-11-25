import '../App.css';
import{useState, useEffect} from 'react';

function OnOffFormulario () {
    const [data, setData] = useState([]);
    
    const datosFormularios = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5010/usuario/datosFormularios', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            const { rows } = await response.json();
            setData(rows);
          } else {
            console.error('Error en la solicitud:', response.statusText);
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };
      
      useEffect(() => {
        datosFormularios();
      }, []);

      const editarEstadosIndividuales = async (id) => {
    
        try {
           await fetch('http://127.0.0.1:5010/usuario/editarEstadosFormulariosIndividuales', {
            method: 'PUT',
            body: JSON.stringify({ id}),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };

      const editarEstados = async () => {
    
        try {
          await fetch('http://127.0.0.1:5010/usuario/editarEstadosFormularios', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };

      const editarEstadosActivados = async (id) => {
        try {
          await fetch('http://127.0.0.1:5010/usuario/editarEstadosFormulariosActivados', {
            method: 'PUT',
            body: JSON.stringify({ id}),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };

  return (
    <>
      <div className="containercenter">
      <table className='table'>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Activar</th>
              <th><button onClick={editarEstados}>Desactivar Todos</button></th>
            </tr>
          </thead>
        <tbody>
         {data.map((elementos)=>(
          <tr key={elementos.id}>
            <td>{elementos.titulo}</td>
            <td>{elementos.descripcion}</td>
            <td><button className='Activarbutton' onClick={() => editarEstadosActivados(elementos.id)}>Activar</button></td>
            <td><button onClick={()=>editarEstadosIndividuales(elementos.id)}>Desactivar</button></td>
          </tr>
         ))}
        </tbody>
      </table>
      </div>
    </>
);
}
export default OnOffFormulario;