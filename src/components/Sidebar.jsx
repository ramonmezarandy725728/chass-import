import { useState } from "react";

import {
  Menu,
  X,
  Home,
  ArrowDownCircle,
  ArrowUpCircle,
  Package,
  BarChart3,
  LogOut,
} from "lucide-react";

export default function Sidebar({
  setPagina,
  setLogeado,
}) {

  const [menuOpen, setMenuOpen] =
    useState(false);

  function cambiarPagina(pagina) {

    setPagina(pagina);

    setMenuOpen(false);
  }

  function cerrarSesion() {

    sessionStorage.removeItem(
      "logeado"
    );

    setLogeado(false);
  }

  return (

    <>

      {/* BOTON MENU CELULAR */}

      <button
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
        className="fixed top-4 left-4 z-50 bg-slate-900 p-3 rounded-xl text-white md:hidden"
      >

        {menuOpen ? <X /> : <Menu />}

      </button>

      {/* SIDEBAR */}

      <div
        className={`
          fixed top-0 left-0 h-full
          bg-slate-950 text-white
          w-72 p-6 z-40
          transform transition-transform duration-300

          ${
            menuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        <h1 className="text-3xl font-bold mb-10 mt-14 md:mt-0">
          CHASS IMPORT
        </h1>

        <div className="flex flex-col gap-4">

          <button
            onClick={() =>
              cambiarPagina("inicio")
            }
            className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl text-left"
          >

            <Home />

            Inicio

          </button>

          <button
            onClick={() =>
              cambiarPagina("entradas")
            }
            className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl text-left"
          >

            <ArrowDownCircle />

            Entradas

          </button>

          <button
            onClick={() =>
              cambiarPagina("salidas")
            }
            className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl text-left"
          >

            <ArrowUpCircle />

            Salidas

          </button>

          <button
            onClick={() =>
              cambiarPagina("productos")
            }
            className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl text-left"
          >

            <Package />

            Productos

          </button>

          <button
            onClick={() =>
              cambiarPagina("ventas")
            }
            className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 p-4 rounded-2xl text-left"
          >

            <BarChart3 />

            Ventas

          </button>

          <button
            onClick={cerrarSesion}
            className="flex items-center gap-3 bg-red-700 hover:bg-red-600 p-4 rounded-2xl mt-8 text-left"
          >

            <LogOut />

            Cerrar Sesión

          </button>

        </div>

      </div>

    </>
  );
}