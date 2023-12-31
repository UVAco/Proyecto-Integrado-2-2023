import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaAdmin from "./PaginaAdmin.jsx";
import PaginaEstudiante from "./PaginaEstudiante.jsx";
import FormEstudi from "./Formulario.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<PaginaAdmin />} />
      <Route path="/est" element={<PaginaEstudiante />} />
      <Route path="/form" element={<FormEstudi />} />
    </Routes>
  </BrowserRouter>
);
