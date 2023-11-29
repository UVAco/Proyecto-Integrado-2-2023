import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const idEncuesta = "";
  const idFormulario = "";

  const iniciarSesion = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:5010/usuario/login", {
      method: "POST",
      body: JSON.stringify({ user, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      setToken(data.token);

      if (data.rol === "administrador") {
        navigate(`/admin?user=${user}&idEncuesta=${idEncuesta}&Formulario=${idFormulario}`);
      } else if (data.rol === "estudiante") {
        navigate(`/est?user=${user}`);
      }
    } else {
      console.error("Autenticación fallida");
      setShowAlert(true);
    }
  };

  return (
    <div>
      {showAlert && (
        <div className="alert">
          Credenciales incorrectas. Por favor, inténtelo de nuevo.
        </div>
      )}
      <form>
        <div><div className="logo"></div>
          <label htmlFor="user">Usuario:</label>
          <input
            type="text"
            id="user"
            name="user"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={iniciarSesion}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
