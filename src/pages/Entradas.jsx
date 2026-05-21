import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Entradas() {

  const [cliente, setCliente] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");

  const [entradas, setEntradas] = useState([]);

  useEffect(() => {
    cargarEntradas();
  }, []);

  const cargarEntradas = async () => {

    const { data } = await supabase
      .from("entradas")
      .select("*")
      .order("fecha", {
        ascending: false,
      });

    setEntradas(data || []);
  };

  const guardarEntrada = async (e) => {

    e.preventDefault();

    await supabase
      .from("entradas")
      .insert([
        {
          cliente,
          producto,
          cantidad,
          monto,
          fecha,
        },
      ]);

    setCliente("");
    setProducto("");
    setCantidad("");
    setMonto("");
    setFecha("");

    cargarEntradas();
  };

  const eliminarEntrada = async (id) => {

    const confirmar = window.confirm(
      "¿Eliminar entrada?"
    );

    if (!confirmar) return;

    await supabase
      .from("entradas")
      .delete()
      .eq("id", id);

    cargarEntradas();
  };

  return (

    <div className="text-white">

      <h1 className="text-4xl font-bold mb-8">
        Entradas
      </h1>

      <form
        onSubmit={guardarEntrada}
        className="bg-slate-800 p-8 rounded-2xl mb-10 grid gap-4"
      >

        <input
          type="text"
          placeholder="Cliente"
          value={cliente}
          onChange={(e) =>
            setCliente(e.target.value)
          }
          className="bg-slate-900 p-4 rounded-xl"
        />

        <input
          type="text"
          placeholder="Producto"
          value={producto}
          onChange={(e) =>
            setProducto(e.target.value)
          }
          className="bg-slate-900 p-4 rounded-xl"
        />

        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) =>
            setCantidad(e.target.value)
          }
          className="bg-slate-900 p-4 rounded-xl"
        />

        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) =>
            setMonto(e.target.value)
          }
          className="bg-slate-900 p-4 rounded-xl"
        />

        <input
          type="date"
          value={fecha}
          onChange={(e) =>
            setFecha(e.target.value)
          }
          className="bg-slate-900 p-4 rounded-xl"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-bold"
        >

          Guardar Entrada

        </button>

      </form>

      <div className="bg-slate-800 p-8 rounded-2xl overflow-auto">

        <h2 className="text-3xl font-bold mb-6">
          Historial de Entradas
        </h2>

        <table className="w-full">

          <thead>

            <tr className="bg-slate-700 text-left">

              <th className="p-4">
                Fecha
              </th>

              <th className="p-4">
                Cliente
              </th>

              <th className="p-4">
                Producto
              </th>

              <th className="p-4">
                Cantidad
              </th>

              <th className="p-4">
                Monto
              </th>

              <th className="p-4">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {entradas.map((entrada) => (

              <tr
                key={entrada.id}
                className="border-b border-slate-700"
              >

                <td className="p-4">
                  {entrada.fecha}
                </td>

                <td className="p-4">
                  {entrada.cliente}
                </td>

                <td className="p-4">
                  {entrada.producto}
                </td>

                <td className="p-4">
                  {entrada.cantidad}
                </td>

                <td className="p-4 text-green-400 font-bold">
                  S/ {entrada.monto}
                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      eliminarEntrada(
                        entrada.id
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold"
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