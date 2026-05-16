function Sidebar({ setPagina, setLogeado }) {

  const cerrarSesion = () => {

    sessionStorage.removeItem("logeado");

    setLogeado(false);
  };

  return (
    <div className="w-72 flex h-screen bg-slate-950 text-white p-6 flex-col justify-between fixed left-0 top-0">

      {/* PARTE SUPERIOR */}
      <div>

        {/* LOGO */}
        <h1 className="text-4xl font-black mb-12 text-blue-400">
          CHASS IMPORT
        </h1>

        {/* MENU */}
        <div className="flex flex-col gap-4">

          {/* INICIO */}
          <button
            onClick={() => setPagina("inicio")}
            className="bg-slate-800 hover:bg-blue-600 transition-all p-4 rounded-2xl text-left"
          >
            Inicio
          </button>

          {/* ENTRADAS */}
          <button
            onClick={() => setPagina("entradas")}
            className="bg-slate-800 hover:bg-green-600 transition-all p-4 rounded-2xl text-left"
          >
            Entradas
          </button>

          {/* SALIDAS */}
          <button
            onClick={() => setPagina("salidas")}
            className="bg-slate-800 hover:bg-red-600 transition-all p-4 rounded-2xl text-left"
          >
            Salidas
          </button>

          {/* VENTAS */}
          <button
            onClick={() => setPagina("ventas")}
            className="bg-slate-800 hover:bg-purple-600 transition-all p-4 rounded-2xl text-left"
          >
            Ventas
          </button>

          {/* PRODUCTOS */}
          <button
            onClick={() => setPagina("productos")}
            className="bg-slate-800 hover:bg-cyan-600 transition-all p-4 rounded-2xl text-left"
          >
            Productos
          </button>

        </div>

      </div>

      {/* BOTON ABAJO */}
      <button
        onClick={cerrarSesion}
        className="bg-red-600 hover:bg-red-700 transition-all p-4 rounded-2xl text-left"
      >
        Cerrar Sesión
      </button>

    </div>
  );
}

export default Sidebar;