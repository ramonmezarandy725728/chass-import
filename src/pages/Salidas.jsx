import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Salidas() {

  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");

  const [salidas, setSalidas] = useState([]);

  useEffect(() => {
    cargarSalidas();
  }, []);

  const cargarSalidas = async () => {

    const { data } = await supabase
      .from("salidas")
      .select("*")
      .order("fecha", {
        ascending: false,
      });

    setSalidas(data || []);
  };

  const guardarSalida = async (e) => {

    e.preventDefault();

    await supabase
      .from("salidas")
      .insert([
        {
          descripcion,
          monto,
          fecha,
        },
      ]);

    setDescripcion("");
    setMonto("");
    setFecha("");

    cargarSalidas();
  };

  const eliminarSalida = async (id) => {

    const confirmar = window.confirm(
      "¿Eliminar salida?"
    );

    if (!confirmar) return;

    await supabase
      .from("salidas")
      .delete()
      .eq("id", id);

    cargarSalidas();
  };

  return (

    <div className="text-white">

      <h1 className="text-4xl font-bold mb-8">
        Salidas
      </h1>

      <form
        onSubmit={guardarSalida}
        className="bg-slate-800 p-8 rounded-2xl mb-10 grid gap-4"
      >

        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) =>
            setDescripcion(e.target.value)
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
          className="bg-red-600 hover:bg-red-700 p-4 rounded-xl font-bold"
        >

          Guardar Salida

        </button>

      </form>

      <div className="bg-slate-800 p-8 rounded-2xl overflow-auto">

        <h2 className="text-3xl font-bold mb-6">
          Historial de Salidas
        </h2>

        <table className="w-full">

          <thead>

            <tr className="bg-slate-700 text-left">

              <th className="p-4">
                Fecha
              </th>

              <th className="p-4">
                Descripción
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

            {salidas.map((salida) => (

              <tr
                key={salida.id}
                className="border-b border-slate-700"
              >

                <td className="p-4">
                  {salida.fecha}
                </td>

                <td className="p-4">
                  {salida.descripcion}
                </td>

                <td className="p-4 text-red-400 font-bold">
                  S/ {salida.monto}
                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      eliminarSalida(
                        salida.id
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