import conn from "../db/connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const datosAdministrador = async (req, res) => {
  const { user } = req.body;
  try {
    const [rows, fields] = await conn
      .promise()
      .query("SELECT nombre, apellido, rol FROM usuario WHERE cedula = ?", [
        user,
      ]);
    res.status(200).json({ rows });
  } catch (error) {
    console.error("Error en la consulta SQL de datosAdministrador:", error);
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const emailUsuarios = async (req, res) => {
  try {
    const [rows, fields] = await conn
      .promise()
      .query("SELECT email FROM usuario ");
    res.status(200).json({ rows });
  } catch (error) {
    console.error("Error en la consulta SQL de emailUsuario:", error);
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const cedulaUsuarios = async (req, res) => {
  try {
    const [rows, fields] = await conn
      .promise()
      .query("SELECT cedula FROM usuario ");
    res.status(200).json({ rows });
  } catch (error) {
    console.error("Error en la consulta SQL de emailUsuario:", error);
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const datosPreguntasAbiertas = async (req, res) => {
  const estado = "activado";

  try {
    const [encuestaRows] = await conn
      .promise()
      .query("SELECT id FROM encuestas WHERE estado = ?", [estado]);
    const idEncuesta = encuestaRows.length > 0 ? encuestaRows[0].id : null;

    if (!idEncuesta) {
      return res.status(404).json({ message: "No hay encuesta activa" });
    }

    const tipo = "abierta";
    const [preguntasRows] = await conn
      .promise()
      .query(
        "SELECT id, texto FROM preguntas WHERE id_encuestas = ? AND tipo = ?",
        [idEncuesta, tipo]
      );

    const preguntasAbiertas = preguntasRows.map((row) => {
      return {
        id_pregunta: row.id,
        pregunta: row.texto,
      };
    });

    res.status(200).json({ preguntasAbiertas });
  } catch (error) {
    console.error(
      "Error en la consulta SQL de datos de datosPreguntasAbiertas:",
      error
    );
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const datosPreguntas = async (req, res) => {
  try {
    const [rows, fields] = await conn.promise().query(`
      SELECT p.texto as pregunta, ra.texto as respuesta
      FROM preguntas p
      LEFT JOIN respuestas_cerradas ra ON p.id = ra.id_preguntas
    `);

    res.status(200).json({ preguntas: rows });
  } catch (error) {
    console.error("Error en la consulta SQL de datoPreguntas:", error);
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const datosEstudiantes = async (req, res) => {
  const rol = "estudiante";
  try {
    const [rows, fields] = await conn
      .promise()
      .query(
        "SELECT nombre, apellido, email, contraseña, fecha_nacimiento, cedula, genero, programa FROM usuario where rol = ?",
        [rol]
      );
    res.status(200).json({ rows });
  } catch (error) {
    console.error("Error en la consulta SQL de dato datosEstudiantes:", error);
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const datosPreguntasCerradas = async (req, res) => {
  const estado = "activado";

  try {
    const [encuestaRows] = await conn
      .promise()
      .query("SELECT id FROM encuestas WHERE estado = ?", [estado]);
    const idEncuesta = encuestaRows.length > 0 ? encuestaRows[0].id : null;

    if (!idEncuesta) {
      return res.status(404).json({ message: "No hay encuesta activa" });
    }

    const tipo = "cerrada";
    const [preguntasRows] = await conn
      .promise()
      .query(
        "SELECT id, texto FROM preguntas WHERE id_encuestas = ? AND tipo = ?",
        [idEncuesta, tipo]
      );

    const preguntasCerradas = await Promise.all(
      preguntasRows.map(async (row) => {
        const idPregunta = row.id;
        const [respuestasRows] = await conn
          .promise()
          .query(
            "SELECT texto FROM respuestas_cerradas WHERE id_preguntas = ?",
            [idPregunta]
          );
        const respuestasCerradas = respuestasRows.map(
          (respuestaRow) => respuestaRow.texto
        );

        return {
          id_pregunta: idPregunta,
          pregunta: row.texto,
          respuestas: respuestasCerradas,
        };
      })
    );

    res.status(200).json({ preguntasCerradas });
  } catch (error) {
    console.error(
      "Error en la consulta SQL de datos de datosPreguntasCerradas:",
      error
    );
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const datosFormularios = async (req, res) => {
  try {
    const [rows, fields] = await conn
      .promise()
      .query("SELECT id, titulo, descripcion FROM encuestas ");
    res.status(200).json({ rows });
  } catch (error) {
    console.error("Error en la consulta SQL de datosFormularios:", error);
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const idFormularios = async (req, res) => {
  const { titulo } = req.query;
  try {
    const [rows, fields] = await conn
      .promise()
      .query("SELECT id FROM encuestas WHERE titulo = ?", [titulo]);
    res.status(200).json({ rows });
  } catch (error) {
    console.error("Error en la consulta SQL de datosFormularios:", error);
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const datosEstudiantesFormulario = async (req, res) => {
  try {
    const [rows3, fields3] = await conn
      .promise()
      .query("SELECT id_usuario FROM usuario_respuestas_cerradas");
    const id_usuario = rows3.map((row) => row.id_usuario);

    const [rows2, fields2] = await conn
      .promise()
      .query("SELECT id_usuario FROM respuestas_abiertas");
    const id_usuario2 = rows2.map((row) => row.id_usuario);

    const allUserIds = [...id_usuario, ...id_usuario2];

    if (allUserIds.length === 0) {
      res.status(200).json({ rows: [] });
      return;
    }

    const [rows, fields] = await conn
      .promise()
      .query(
        "SELECT cedula, nombre, apellido, email FROM usuario WHERE id IN (?)",
        [allUserIds]
      );

    res.status(200).json({ rows });
  } catch (error) {
    console.error("Error en la consulta SQL de datosFormularios:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

const respuestaAbiertaEstudiante = async (req, res) => {
  const rol = "estudiante";
  try {
    const [rows2, fields2] = await conn
      .promise()
      .query("SELECT id FROM usuario WHERE rol = ?", [rol]);
    const id_usuario = rows2.length > 0 ? rows2[0].id : null;

    const [rows, fields] = await conn
      .promise()
      .query("SELECT texto FROM respuestas_abiertas WHERE id_usuario = ?", [
        id_usuario,
      ]);

    res.status(200).json({ rows });
  } catch (error) {
    console.error("Error en la consulta SQL de datosFormularios:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

const datosPreguntasRespuestasCerradas = async (req, res) => {
  const { id_encuestas } = req.query;
  const tipo = "cerrada";
  const { cedula } = req.query;

  try {
    const [rows5, fields5] = await conn
      .promise()
      .query("SELECT id FROM usuario where cedula =?  ", [cedula]);

    if (rows5.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const [rowsUsuarioRespuestasCerradas, fields4] = await conn
      .promise()
      .query(
        "SELECT idRespuesta_cerrada FROM usuario_respuestas_cerradas WHERE id_usuario = ?",
        [rows5[0].id]
      );

    const [rowscerrada1, fields3] = await conn
      .promise()
      .query(
        "SELECT p.id AS id_pregunta, p.texto AS pregunta, r.id AS id_respuesta, r.texto AS respuesta FROM preguntas p LEFT JOIN respuestas_cerradas r ON p.id = r.id_preguntas WHERE p.id_encuestas = ? AND p.tipo = ?",
        [id_encuestas, tipo]
      );

    const preguntas = rowscerrada1
      .map((pregunta) => {
        const respuesta = rowsUsuarioRespuestasCerradas.find(
          (resp) => resp.idRespuesta_cerrada === pregunta.id_respuesta
        );
        return {
          pregunta: pregunta.pregunta,
          respuestaUsuario: respuesta ? pregunta.respuesta : null,
        };
      })
      .filter((pregunta) => pregunta.respuestaUsuario !== null);

    res.status(200).json({ preguntas });
  } catch (error) {
    console.error("Error en la consulta SQL de datosFormularios:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

const datosPreguntasRespuestasAbiertas = async (req, res) => {
  const { id_encuestas } = req.query;
  const { cedula } = req.query;
  const tipo = "abierta";

  try {
    const [rows4, fields4] = await conn
      .promise()
      .query("SELECT id FROM usuario where cedula =?  ", [cedula]);

    if (rows4.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const id_usuario = rows4.map((row) => row.id);

    const [rowsabiertas1, fields3] = await conn
      .promise()
      .query(
        "SELECT id, texto FROM preguntas WHERE id_encuestas = ? AND tipo = ?",
        [id_encuestas, tipo]
      );

    const preguntas = rowsabiertas1.map((pregunta) => ({
      ...pregunta,
      tipo: "abierta",
      respuesta: null,
    }));

    const [rowsabiertas3, fields] = await conn
      .promise()
      .query(
        "SELECT id_preguntas, texto FROM respuestas_abiertas WHERE id_usuario IN (?) AND id_preguntas IN (?) ",
        [id_usuario, rowsabiertas1.map((pregunta) => pregunta.id)]
      );

    const respuestasAbiertas = rowsabiertas3.reduce((acc, respuesta) => {
      const index = preguntas.findIndex(
        (pregunta) => pregunta.id === respuesta.id_preguntas
      );
      if (index !== -1) {
        preguntas[index].respuesta = respuesta.texto;
      }
      return preguntas;
    }, []);

    res.status(200).json({ preguntas, respuestasAbiertas });
  } catch (error) {
    console.error("Error en la consulta SQL de datosFormularios:", error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

const datosFormulariosActivados = async (req, res) => {
  const estado = "activado";
  try {
    const [rows, fields] = await conn
      .promise()
      .query(
        "SELECT id, titulo, descripcion FROM encuestas where estado = ? ",
        [estado]
      );
    res.status(200).json({ rows });
  } catch (error) {
    console.error("Error en la consulta SQL de datosFormularios:", error);
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const insertaRespuestaPreguntaCerrada = async (req, res) => {
  const { input, idPregunta } = req.body;
  const sql =
    "INSERT INTO respuestas_cerradas (texto, id_preguntas) VALUES (?, ?)";
  conn.query(sql, [input, idPregunta], async (err, result) => {
    if (err) {
      console.error(
        "Error el insertar datos SQL de insertaRespuestaPreguntaCerrada:",
        err
      );
      return res
        .status(500)
        .json({ message: "Error en el servidor", error: err });
    }
  });
};

const insertarRespuestaCerrada = async (req, res) => {
  const { cedula, texto, id_preguntas } = req.body;

  try {
    const [rows, fields] = await conn
      .promise()
      .query("SELECT id FROM usuario WHERE cedula = ?", [cedula]);
    const id_usuario = rows.length > 0 ? rows[0].id : null;

    const [rows2, fields2] = await conn
      .promise()
      .query(
        "SELECT id FROM respuestas_cerradas WHERE texto = ? AND id_preguntas= ?",
        [texto, id_preguntas]
      );
    const idRespuesta_cerrada = rows2.length > 0 ? rows2[0].id : null;

    const sql =
      "INSERT INTO usuario_respuestas_cerradas (idRespuesta_cerrada, id_usuario) VALUES (?, ?)";
    const result = await conn
      .promise()
      .query(sql, [idRespuesta_cerrada, id_usuario]);

    console.log("Consulta SQL ejecutada correctamente");
    return res
      .status(200)
      .json({ message: "Respuesta cerrada insertada correctamente" });
  } catch (error) {
    console.error(
      "Error al obtener el ID del usuario o al insertar datos:",
      error
    );
    return res
      .status(500)
      .json({ message: "Error en el servidor", error: error });
  }
};

const insertarRespuestaAbierta = async (req, res) => {
  const { texto, id_preguntas, cedula } = req.body;

  try {
    const [rows, fields] = await conn
      .promise()
      .query("SELECT id FROM usuario WHERE cedula = ?", [cedula]);
    const id_usuario = rows.length > 0 ? rows[0].id : null;

    const sql =
      "INSERT INTO respuestas_abiertas (texto, id_preguntas, id_usuario) VALUES (?, ?, ?)";
    const result = await conn
      .promise()
      .query(sql, [texto, id_preguntas, id_usuario]);

    res
      .status(200)
      .json({ message: "Respuesta abierta insertada correctamente." });
  } catch (error) {
    console.error(
      "Error al obtener el ID del usuario o al insertar datos:",
      error
    );
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const insertarDatosEstudiantes = async (req, res) => {
  const rol = "estudiante";
  const {
    nombre,
    apellido,
    email,
    contraseña,
    nacimiento,
    cedula,
    genero,
    programa,
  } = req.body;
  try {
    const [rows, fields] = await conn.promise().query(
      `INSERT INTO usuario (nombre, apellido, email, contraseña, rol, fecha_nacimiento, 
    cedula, genero, programa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre,
        apellido,
        email,
        contraseña,
        rol,
        nacimiento,
        cedula,
        genero,
        programa,
      ]
    );

    res.status(200).json({ preguntas: rows });
  } catch (error) {
    console.error("Error al insertar datos de estudiantes:", error);
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const insertarDatosPreguntas = async (req, res) => {
  const { texto, tipo, idEncuesta } = req.body;
  const sql =
    "INSERT INTO preguntas (texto, id_encuestas, tipo) VALUES (?, ?, ?)";
  conn.query(sql, [texto, idEncuesta, tipo], async (err, result) => {
    if (err) {
      console.error("Error al insertar datos de preguntas:", err);
      return res
        .status(500)
        .json({ message: "Error en el servidor", error: err });
    }

    const idPregunta = result.insertId;

    try {
      const [rows, fields] = await conn
        .promise()
        .query("SELECT id FROM preguntas WHERE texto = ?", [texto]);
      res.status(200).json({ idPregunta });
    } catch (error) {
      console.error("Error en la consulta SQL de idPregunta:", error);
      res.status(500).json({ message: "Error en el servidor", error: error });
    }
  });
};

const insertarDatosEncuesta = async (req, res) => {
  const { titulo, descripcion, user } = req.body;
  const estado = "desactivado";

  try {
    const [rows, fields] = await conn
      .promise()
      .query("SELECT id FROM usuario WHERE cedula = ?", [user]);
    const idUsuario = rows.length > 0 ? rows[0].id : null;

    if (!titulo || !descripcion || idUsuario === null) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const sql =
      "INSERT INTO encuestas (titulo, descripcion, estado, id_usuario) VALUES (?, ?, ?, ?)";
    conn.query(
      sql,
      [titulo, descripcion, estado, idUsuario],
      async (err, result) => {
        if (err) {
          console.error("Error en la consulta SQL:", err);
          return res
            .status(500)
            .json({ message: "Error en el servidor", error: err });
        }

        const idEncuesta2 = result.insertId;

        try {
          const [rows, fields] = await conn
            .promise()
            .query("SELECT id FROM encuestas WHERE titulo = ?", [titulo]);
          res.status(200).json({ idEncuesta2 });
        } catch (error) {
          console.error("Error en la consulta SQL de datosPreguntas:", error);
          res
            .status(500)
            .json({ message: "Error en el servidor", error: error });
        }
      }
    );
  } catch (error) {
    console.error(
      "Error al obtener el ID del usuario o al insertar datos:",
      error
    );
    return res
      .status(500)
      .json({ message: "Error en el servidor", error: error });
  }
};

const login = async (req, res) => {
  const { user, password } = req.body;

  try {
    const [rows, fields] = await conn
      .promise()
      .query(
        'SELECT cedula, contraseña, rol FROM usuario WHERE rol = "estudiante" OR rol = "administrador"'
      );

    if (rows.length === 0) {
      // El usuario no existe
      return res.status(401).json({ message: "Autenticación fallida" });
    }

    const validUser = rows.find(
      (row) => row.cedula === user && row.contraseña === password
    );

    if (validUser) {
      const token = jwt.sign({ username: user }, "proyecto", {
        expiresIn: "1h",
      });
      res.status(200).json({ token, rol: validUser.rol });
    } else {
      // Las credenciales no coinciden
      res.status(401).json({ message: "Autenticación fallida" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const editarDatosEstudiantes = async (req, res) => {
  const {
    nombre,
    apellido,
    email,
    contraseña,
    nacimiento,
    genero,
    programa,
    cedula,
  } = req.body;
  try {
    const [rows, fields] = await conn.promise().query(
      `UPDATE usuario SET nombre= ?, apellido= ?, email= ?, contraseña= ?, fecha_nacimiento= ?, 
      genero= ?, programa= ? where cedula= ?`,
      [
        nombre,
        apellido,
        email,
        contraseña,
        nacimiento,
        genero,
        programa,
        cedula,
      ]
    );
    res.status(200).json({ preguntas: rows });
  } catch (error) {
    console.error("Error al editar datos de estudiantes:", error);
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const editarEstadosFormulariosIndividuales = async (req, res) => {
  const { id } = req.body;
  const estado = "desactivado";
  try {
    const [rows, fields] = await conn
      .promise()
      .query(`UPDATE encuestas SET estado= ? where id= ?`, [estado, id]);
    res.status(200).json({ preguntas: rows });
  } catch (error) {
    console.error(
      "Error al editar estador de formularios individuales:",
      error
    );
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const editarEstadosFormularios = async (req, res) => {
  const estado = "desactivado";
  try {
    const [rows, fields] = await conn
      .promise()
      .query(`UPDATE encuestas SET estado= ? `, [estado]);
    res.status(200).json({ preguntas: rows });
  } catch (error) {
    console.error("Error al editar estados de formularios:", error);
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const editarEstadosFormulariosActivados = async (req, res) => {
  const estado = "activado";
  const { id } = req.body;
  try {
    const [rows, fields] = await conn
      .promise()
      .query(`UPDATE encuestas SET estado= ? where id = ?`, [estado, id]);
    res.status(200).json({ preguntas: rows });
  } catch (error) {
    console.error("Error al editar estados de formularios activados:", error);
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const eliminarEstudiantes = async (req, res) => {
  const { cedula } = req.body;
  try {
    const [rows, fields] = await conn
      .promise()
      .query(`DELETE FROM usuario WHERE cedula = ?`, [cedula]);
    res.status(200).json({ preguntas: rows });
  } catch (error) {
    console.error("Error al eliminar estudiantes:", error);
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
  console.log("Datos recibidos:", { cedula });
};

export const usuarioController = {
  login,
  datosAdministrador,
  insertarDatosPreguntas,
  insertarDatosEncuesta,
  insertaRespuestaPreguntaCerrada,
  datosFormularios,
  datosPreguntas,
  insertarDatosEstudiantes,
  datosEstudiantes,
  editarDatosEstudiantes,
  eliminarEstudiantes,
  editarEstadosFormulariosIndividuales,
  editarEstadosFormularios,
  editarEstadosFormulariosActivados,
  datosPreguntasCerradas,
  datosPreguntasAbiertas,
  datosFormulariosActivados,
  emailUsuarios,
  cedulaUsuarios,
  insertarRespuestaCerrada,
  insertarRespuestaAbierta,
  datosEstudiantesFormulario,
  respuestaAbiertaEstudiante,
  idFormularios,
  datosPreguntasRespuestasAbiertas,
  datosPreguntasRespuestasCerradas,
};
