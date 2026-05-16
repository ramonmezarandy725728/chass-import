import { useEffect, useState } from "react";

import ClientesChart from "../components/charts/ClientesChart";

function Salidas() {

  const [producto, setProducto] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");

  const [modoEdicion, setModoEdicion] = useState(false);

  const [indiceEditar, setIndiceEditar] = useState(null);

  const [registros, setRegistros] = useState(() => {

    const datosGuardados =
      localStorage.getItem("salidas");

    return datosGuardados
      ? JSON.parse(datosGuardados)
      : [];
  });

  // GUARDAR LOCALSTORAGE
  useEffect(() => {

    localStorage.setItem(
      "salidas",
      JSON.stringify(registros)
    );


  }, [registros]);

  // LIMPIAR
  const limpiarFormulario = () => {

    setProducto("");
    setProveedor("");
    setCantidad("");
    setMonto("");
    setFecha("");
  };

  // GUARDAR
  const guardarSalida = () => {

    if (
      !producto ||
      !proveedor ||
      !cantidad ||
      !monto ||
      !fecha
    ) {
      alert("Complete todos los campos");
      return;
    }

    const nuevaSalida = {
      producto,
      proveedor,
      cantidad,
      monto,
      fecha,
    };

    if (modoEdicion) {

      const copia = [...registros];

      copia[indiceEditar] = nuevaSalida;

      setRegistros(copia);

      setModoEdicion(false);

      setIndiceEditar(null);

    } else {

      setRegistros([
        ...registros,
        nuevaSalida
      ]);
    }

    limpiarFormulario();
  };

  // ELIMINAR
  const borrarRegistro = (index) => {

    const nuevos =
      registros.filter((_, i) => i !== index);

    setRegistros(nuevos);
  };

  // EDITAR
  const editarRegistro = (index) => {

    const registro = registros[index];

    setProducto(registro.producto);
    setProveedor(registro.proveedor);
    setCantidad(registro.cantidad);
    setMonto(registro.monto);
    setFecha(registro.fecha);

    setModoEdicion(true);

    setIndiceEditar(index);
  };

  return (
    <div className="flex-1 p-10 text-white bg-slate-800 min-h-screen">

      {/* TITULO */}
      <h1 className="text-5xl font-bold mb-10">
        Registro de Salidas
      </h1>

      {/* FORMULARIO */}
      <div className="bg-slate-950 p-8 rounded-3xl mb-10">

        <div className="grid grid-cols-2 gap-6">

          {/* FECHA */}
          <div>

            <label className="block mb-2 text-lg">
              Fecha
            </label>

            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

          </div>

          {/* PRODUCTO */}
          <div>

            <label className="block mb-2 text-lg">
              Tipo de Gasto
            </label>

            <select
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
            >

              <option value="">
                Seleccione gasto
              </option>

              <option value="Compra iPhone">
                Compra iPhone
              </option>

              <option value="Publicidad">
                Publicidad
              </option>

              <option value="Transporte">
                Transporte
              </option>

              <option value="Servicios">
                Servicios
              </option>

              <option value="Productos Externos">
                Productos Externos
              </option>

            </select>

          </div>

          {/* PROVEEDOR */}
          <div>

            <label className="block mb-2 text-lg">
              Proveedor
            </label>

            <input
              type="text"
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

          </div>

          {/* CANTIDAD */}
          <div>

            <label className="block mb-2 text-lg">
              Cantidad
            </label>

            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

          </div>

          {/* MONTO */}
          <div>

            <label className="block mb-2 text-lg">
              Monto
            </label>

            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

          </div>

        </div>

        {/* BOTON */}
        <button
          onClick={guardarSalida}
          className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl mt-8 text-lg"
        >

          {modoEdicion
            ? "Actualizar Salida"
            : "Guardar Salida"}

        </button>

      </div>

      {/* TABLA */}
      <div className="bg-slate-950 p-6 rounded-3xl">

        <h2 className="text-3xl font-bold mb-6">
          Historial de Salidas
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="p-4 text-left">
                Fecha
              </th>

              <th className="p-4 text-left">
                Gasto
              </th>

              <th className="p-4 text-left">
                Proveedor
              </th>

              <th className="p-4 text-left">
                Cantidad
              </th>

              <th className="p-4 text-left">
                Monto
              </th>

              <th className="p-4 text-left">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {registros.map((registro, index) => (

              <tr
                key={index}
                className="border-b border-slate-800"
              >

                <td className="p-4">
                  {registro.fecha}
                </td>

                <td className="p-4">
                  {registro.producto}
                </td>

                <td className="p-4">
                  {registro.proveedor}
                </td>

                <td className="p-4">
                  {registro.cantidad}
                </td>

                <td className="p-4 text-red-400 font-bold">
                  S/ {registro.monto}
                </td>

                <td className="p-4 flex gap-2">

                  <button
                    onClick={() => editarRegistro(index)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => borrarRegistro(index)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Salidas;