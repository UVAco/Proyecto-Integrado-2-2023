import conn from "../db/connection.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const datosAdministrador = async (req, res) => {
  const { user } = req.body;
  const sql = 'SELECT nombre, apellido, rol FROM usuario WHERE cedula = ?';
  conn.query(sql, [user],(err, result) => {});
  try {
    const [rows, fields] = await conn.promise().query(sql);
    res.status(200).json({ rows });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error });
  }
};

const insertarDatosPreguntas = async (req, res) => {
  const { texto, tipo, idEncuesta} = req.body;
  console.log('Datos recibidos:', { texto, tipo});
  const sql = 'INSERT INTO preguntas (texto, id_encuestas, tipo) VALUES (?, ?, ?)';
  console.log('SQL:', sql);
  conn.query(sql, [ texto, idEncuesta, tipo], (err, result) => {
  if (err) {
    console.error('Error en la consulta SQL de datosPreguntas:', err);
    return res.status(500).json({ message: 'Error en el servidor', error: err });
  }
});
};

const insertarDatosEncuesta = async (req, res) => {
  const { titulo, descripcion, user} = req.body;
  console.log('Datos recibidos:', { titulo, descripcion, user });

  try {
    const [rows, fields] = await conn.promise().query('SELECT id FROM usuario WHERE cedula = ?', [user]);
    const idUsuario = rows.length > 0 ? rows[0].id : null;
 
    console.log('Solicitud a insertarDatosEncuesta:', {
      titulo,
      descripcion,
      userId: idUsuario, 
    }); 

    if (!titulo || !descripcion || idUsuario === null) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const sql = 'INSERT INTO encuestas (titulo, descripcion, id_usuario) VALUES (?, ?, ?)';
    conn.query(sql, [titulo, descripcion, idUsuario], async (err, result) => {
      if (err) {
        console.error('Error en la consulta SQL:', err);
        return res.status(500).json({ message: 'Error en el servidor', error: err });
      }

      const idEncuesta2 = result.insertId;
      

      try {
        const [rows, fields] = await conn.promise().query('SELECT id FROM encuestas WHERE id = ?', [titulo]);
        
        //res.status(200).json({ rows });
        res.status(200).json({ idEncuesta2 });
        console.log('Solicitud a datosPreguntas:', { titulo, rows });
        //insertarDatosPreguntas(req, res, idEncuesta);
      } catch (error) {
        console.error('Error en la consulta SQL de datosPreguntas:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error });
      }
    });
  } catch (error) {
    console.error('Error al obtener el ID del usuario o al insertar datos:', error);
    return res.status(500).json({ message: 'Error en el servidor', error: error });
  }
};


const login = async (req, res) => {
    const { user, password } = req.body;
  
    try {
      const [rows, fields] = await conn
        .promise()
        .query('SELECT cedula, contraseña, rol FROM usuario WHERE rol = "estudiante" OR rol = "administrador"');
  
      if (rows.length === 0) {
        // El usuario no existe
        return res.status(401).json({ message: 'Autenticación fallida' });
      }
  
      const validUser = rows.find(row => row.cedula === user && row.contraseña === password);
  
      if (validUser) {
        const token = jwt.sign({ username: user }, 'proyecto', { expiresIn: '1h' });
        res.status(200).json({ token, rol: validUser.rol });
      } else {
        // Las credenciales no coinciden
        res.status(401).json({ message: 'Autenticación fallida' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    };
  };
  
  
  
export const usuarioController = {
    login,
    datosAdministrador,
    insertarDatosPreguntas,
    insertarDatosEncuesta,
}