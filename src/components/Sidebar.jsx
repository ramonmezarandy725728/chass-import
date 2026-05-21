import { useState } from "react";

export default function Sidebar({
  setPagina,
  setLogeado,
}) {

  const [abierto, setAbierto] =
    useState(false);

  function cambiarPagina(pagina) {

    setPagina(pagina);

    setAbierto(false);
  }

  function cerrarSesion() {

    sessionStorage.removeItem(
      "logeado"
    );

    setLogeado(false);
  }

  return (

    <>

      {/* BOTON 3 LINEAS */}

      <button
        onClick={() =>
          setAbierto(!abierto)
        }
        className="
          fixed top-4 left-4
          z-50
          bg-slate-800
          text-white
          px-4 py-2
          rounded-xl
        "
      >

        ☰

      </button>

      {/* MENU */}

      {abierto && (

        <div
          className="
            fixed top-0 left-0
            w-64 h-full
            bg-slate-950
            p-6
            z-40
          "
        >

          <h1 className="
            text-3xl font-bold
            mt-14 mb-10
          ">
            CHASS IMPORT
          </h1>

          <div className="
            flex flex-col gap-4
          ">

            <button
              onClick={() =>
                cambiarPagina("inicio")
              }
              className="
                bg-slate-800
                p-4 rounded-2xl
              "
            >
              Inicio
            </button>

            <button
              onClick={() =>
                cambiarPagina("entradas")
              }
              className="
                bg-slate-800
                p-4 rounded-2xl
              "
            >
              Entradas
            </button>

            <button
              onClick={() =>
                cambiarPagina("salidas")
              }
              className="
                bg-slate-800
                p-4 rounded-2xl
              "
            >
              Salidas
            </button>

            <button
              onClick={() =>
                cambiarPagina("productos")
              }
              className="
                bg-slate-800
                p-4 rounded-2xl
              "
            >
              Productos
            </button>

            <button
              onClick={() =>
                cambiarPagina("ventas")
              }
              className="
                bg-slate-800
                p-4 rounded-2xl
              "
            >
              Ventas
            </button>

            <button
              onClick={cerrarSesion}
              className="
                bg-red-700
                p-4 rounded-2xl
                mt-6
              "
            >
              Cerrar Sesión
            </button>

          </div>

        </div>

      )}

    </>
  );
}