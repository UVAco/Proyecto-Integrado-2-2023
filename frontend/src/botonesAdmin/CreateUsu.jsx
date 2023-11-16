import './DiseñoCreateUsu.css';
const CreateUsuario = () =>{
    const handlerDeleteUsuario =(id) =>{
        
      }
      const handlerAddUsuario  = (id) => {

      }
return(
    <>
   <table className="rtables">
   <thead className="table-dark">
            <tr className="botoneses">
                <button onClick={()=> handlerAddUsuario(id)}>Crear</button>
                <button >Editar</button>
                <button  onClick={()=> handlerDeleteUsuario(id)}>Eliminar</button>
            </tr>    
    </thead>
   </table>
    </>
)
}
export default CreateUsuario;