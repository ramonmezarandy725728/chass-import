import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Entradas from "./pages/Entradas";
import Salidas from "./pages/Salidas";
import Ventas from "./pages/Ventas";
import Productos from "./pages/Productos";
import Login from "./pages/Login";

function App() {

  // LOGIN
  const [logeado, setLogeado] = useState(
    sessionStorage.getItem("logeado") === "true"
  );

  // MENU MOVIL
  const [menuAbierto, setMenuAbierto] =
    useState(false);

  // PAGINAS
  const [pagina, setPagina] =
    useState("inicio");

  // DINERO
  const [dineroEmpresa, setDineroEmpresa] =
    useState(100);

  const [dineroEntrante, setDineroEntrante] =
    useState(0);

  const [dineroSaliente, setDineroSaliente] =
    useState(0);

  // ACTUALIZAR DINERO
  const actualizarDinero = () => {

    const entradas =
      JSON.parse(
        localStorage.getItem("entradas")
      ) || [];

    const salidas =
      JSON.parse(
        localStorage.getItem("salidas")
      ) || [];

    const totalEntradas =
      entradas.reduce(
        (acc, item) =>
          acc + Number(item.monto),
        0
      );

    const totalSalidas =
      salidas.reduce(
        (acc, item) =>
          acc + Number(item.monto),
        0
      );

    setDineroEntrante(totalEntradas);

    setDineroSaliente(totalSalidas);

    setDineroEmpresa(
      100 +
      totalEntradas -
      totalSalidas
    );
  };

  // CARGAR
  useEffect(() => {

    actualizarDinero();

  }, []);

  // LOGIN
  if (!logeado) {

    return (
      <Login setLogeado={setLogeado} />
    );
  }

  return (

    <div className="flex bg-slate-900 min-h-screen">

      {/* SIDEBAR */}
      {/* SIDEBAR PC */}
<div className="hidden md:flex">
  <Sidebar
    setPagina={setPagina}
    setLogeado={setLogeado}
  />
</div>

{/* SIDEBAR CELULAR */}
{menuAbierto && (
  <div className="md:hidden">
    <Sidebar
      setPagina={setPagina}
      setLogeado={setLogeado}
    />
  </div>
)}

      {/* CONTENIDO */}
      <div className="flex-1 md:ml-72 ml-0">

        {/* BOTON MENU CELULAR */}
        <button
          className="md:hidden bg-slate-950 text-white p-4 w-full text-left text-2xl"
          onClick={() =>
            setMenuAbierto(!menuAbierto)
          }
        >
          ☰ Menu
        </button>

        {/* INICIO */}
        {pagina === "inicio" && (

          <Dashboard
            dineroEmpresa={dineroEmpresa}
            dineroEntrante={dineroEntrante}
            dineroSaliente={dineroSaliente}
          />

        )}

        {/* ENTRADAS */}
        {pagina === "entradas" && (

          <Entradas
            actualizarDinero={actualizarDinero}
          />

        )}

        {/* SALIDAS */}
        {pagina === "salidas" && (

          <Salidas
            actualizarDinero={actualizarDinero}
          />

        )}

        {/* VENTAS */}
        {pagina === "ventas" && (

          <Ventas />

        )}

        {/* PRODUCTOS */}
        {pagina === "productos" && (

          <Productos />

        )}

      </div>

    </div>
  );
}

export default App;