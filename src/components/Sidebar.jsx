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
        className="
          fixed top-4 left-4 z-50
          bg-slate-900
          p-3 rounded-xl
          text-white
          md:hidden
        "
      >

        {menuOpen ? <X /> : <Menu />}

      </button>

      {/* FONDO OSCURO */}

      {menuOpen && (

        <div
          className="
            fixed inset-0
            bg-black/50
            z-30
            md:hidden
          "
          onClick={() =>
            setMenuOpen(false)
          }
        ></div>

      )}

      {/* SIDEBAR */}

      <div
        className={`
          fixed top-0 left-0
          h-full
          w-72
          bg-slate-950
          p-6
          z-40
          transition-transform
          duration-300

          ${
            menuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        <h1 className="
          text-3xl font-bold
          mt-16 md:mt-0
          mb-10
        ">
          CHASS IMPORT
        </h1>

        <div className="flex flex-col gap-4">

          <button
            onClick={() =>
              cambiarPagina("inicio")
            }
            className="
              flex items-center gap-3
              bg-slate-800
              hover:bg-slate-700
              p-4 rounded-2xl
            "
          >

            <Home />

            Inicio

          </button>

          <button
            onClick={() =>
              cambiarPagina("entradas")
            }
            className="
              flex items-center gap-3
              bg-slate-800
              hover:bg-slate-700
              p-4 rounded-2xl
            "
          >

            <ArrowDownCircle />

            Entradas

          </button>

          <button
            onClick={() =>
              cambiarPagina("salidas")
            }
            className="
              flex items-center gap-3
              bg-slate-800
              hover:bg-slate-700
              p-4 rounded-2xl
            "
          >

            <ArrowUpCircle />

            Salidas

          </button>

          <button
            onClick={() =>
              cambiarPagina("productos")
            }
            className="
              flex items-center gap-3
              bg-slate-800
              hover:bg-slate-700
              p-4 rounded-2xl
            "
          >

            <Package />

            Productos

          </button>

          <button
            onClick={() =>
              cambiarPagina("ventas")
            }
            className="
              flex items-center gap-3
              bg-slate-800
              hover:bg-slate-700
              p-4 rounded-2xl
            "
          >

            <BarChart3 />

            Ventas

          </button>

          <button
            onClick={cerrarSesion}
            className="
              flex items-center gap-3
              bg-red-700
              hover:bg-red-600
              p-4 rounded-2xl
              mt-8
            "
          >

            <LogOut />

            Cerrar Sesión

          </button>

        </div>

      </div>

    </>
  );
}