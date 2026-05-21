import { useState } from "react";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Entradas from "./pages/Entradas";
import Salidas from "./pages/Salidas";
import Ventas from "./pages/Ventas";
import Productos from "./pages/Productos";
import Login from "./pages/Login";

function App() {

  const [logeado, setLogeado] = useState(
    sessionStorage.getItem("logeado") === "true"
  );

  const [pagina, setPagina] = useState("inicio");

  if (!logeado) {
    return <Login setLogeado={setLogeado} />;
  }

  return (

    <div className="
      bg-slate-900
      min-h-screen
      text-white
      p-4
    ">

      <Sidebar
        setPagina={setPagina}
        setLogeado={setLogeado}
      />

      <div className="pt-20">

        {pagina === "inicio" && <Dashboard />}

        {pagina === "entradas" && <Entradas />}

        {pagina === "salidas" && <Salidas />}

        {pagina === "ventas" && <Ventas />}

        {pagina === "productos" && <Productos />}

      </div>

    </div>
  );
}

export default App;