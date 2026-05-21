const eliminarEntrada = async (id) => {

  const { error } = await supabase
    .from("entradas")
    .delete()
    .eq("id", id);

  if (!error) {
    obtenerEntradas();
  }
};
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Entradas() {

  const [fecha, setFecha] = useState("");
  const [cliente, setCliente] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [monto, setMonto] = useState("");

  const [entradas, setEntradas] = useState([]);

  useEffect(() => {
    obtenerEntradas();
  }, []);

  const obtenerEntradas = async () => {

    const { data, error } = await supabase
      .from("entradas")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (!error) {
      setEntradas(data || []);
    }
  };

  const guardarEntrada = async () => {

    if (
      !fecha ||
      !cliente ||
      !producto ||
      !cantidad ||
      !monto
    ) {
      alert("Completa todos los campos");
      return;
    }

    const { error } = await supabase
      .from("entradas")
      .insert([
        {
          fecha,
          cliente,
          producto,
          cantidad: Number(cantidad),
          monto: Number(monto),
        },
      ]);

    if (!error) {

      obtenerEntradas();

      setFecha("");
      setCliente("");
      setProducto("");
      setCantidad("");
      setMonto("");

    } else {

      console.log(error);
      alert("Error al guardar");
    }
  };

  return (

    <div className="text-white">

      <h1 className="text-4xl font-bold mb-8">
        Entradas
      </h1>

      <div className="bg-slate-800 p-6 rounded-2xl mb-8 grid md:grid-cols-2 gap-4">

        <input
          type="date"
          value={fecha}
          onChange={(e) =>
            setFecha(e.target.value)
          }
          className="p-3 rounded bg-slate-900"
        />

        <input
          type="text"
          placeholder="Cliente"
          value={cliente}
          onChange={(e) =>
            setCliente(e.target.value)
          }
          className="p-3 rounded bg-slate-900"
        />

        <select
          value={producto}
          onChange={(e) =>
            setProducto(e.target.value)
          }
          className="p-3 rounded bg-slate-900"
        >

          <option value="">
            Producto
          </option>

          <option>
            iPhone Mixtos
          </option>

          <option>
            iPhone 15
          </option>

          <option>
            iPhone 16
          </option>

          <option>
            iPhone 17
          </option>

          <option>
            Productos Externos
          </option>

        </select>

        <input
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) =>
            setCantidad(e.target.value)
          }
          className="p-3 rounded bg-slate-900"
        />

        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) =>
            setMonto(e.target.value)
          }
          className="p-3 rounded bg-slate-900"
        />

      </div>

      <button
        onClick={guardarEntrada}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl mb-8"
      >
        Guardar Entrada
      </button>

      <div className="bg-slate-800 p-6 rounded-2xl mb-8 overflow-auto">

        <h2 className="text-2xl font-bold mb-6">
          Historial de Entradas
        </h2>

        <table className="w-full text-left border-collapse">

          <thead className="bg-slate-700">

            <tr>

              <th className="p-3">
                Fecha
              </th>

              <th className="p-3">
                Cliente
              </th>

              <th className="p-3">
                Producto
              </th>

              <th className="p-3">
                Cantidad
              </th>

              <th className="p-3">
                Monto
                <td className="p-3 text-green-400 font-bold"></td>
              </th>
              <th className="p-3">
                 Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {entradas.map((entrada) => (

              <tr
                key={entrada.id}
                className="border-b border-slate-700 hover:bg-slate-700"
              >

                <td className="p-3">
                  {entrada.fecha}
                </td>

                <td className="p-3">
                  {entrada.cliente}
                </td>

                <td className="p-3">
                  {entrada.producto}
                </td>

                <td className="p-3">
                  {entrada.cantidad}
                </td>

                <td className="p-3 text-green-400 font-bold">
                  S/ {entrada.monto}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="bg-slate-800 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Clientes que más compran
        </h2>

        <div className="space-y-4">

          {entradas.map((entrada) => (

            <div key={entrada.id}>

              <div className="flex justify-between mb-2">

                <span>
                  {entrada.cliente}
                </span>

                <span>
                  S/ {entrada.monto}
                </span>

              </div>

              <div className="w-full bg-slate-700 rounded-full h-5">

                <div
                  className="bg-blue-500 h-5 rounded-full"
                  style={{
                    width: `${Math.min(
                      entrada.monto / 10,
                      100
                    )}%`,
                  }}
                ></div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}