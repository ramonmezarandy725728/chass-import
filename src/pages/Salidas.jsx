import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Salidas() {

  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] =
    useState("");

  const [monto, setMonto] = useState("");

  const [salidas, setSalidas] = useState([]);

  useEffect(() => {
    obtenerSalidas();
  }, []);

  const obtenerSalidas = async () => {

    const { data, error } = await supabase
      .from("salidas")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (!error) {
      setSalidas(data || []);
    }
  };

  const guardarSalida = async () => {

    if (
      !fecha ||
      !descripcion ||
      !monto
    ) {
      alert("Completa todos los campos");
      return;
    }

    const { error } = await supabase
      .from("salidas")
      .insert([
        {
          fecha,
          descripcion,
          monto: Number(monto),
        },
      ]);

    if (!error) {

      obtenerSalidas();

      setFecha("");
      setDescripcion("");
      setMonto("");

    } else {

      console.log(error);
      alert("Error al guardar");
    }
  };

  return (

    <div className="text-white">

      <h1 className="text-4xl font-bold mb-8">
        Salidas
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
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) =>
            setDescripcion(e.target.value)
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
        onClick={guardarSalida}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl mb-8"
      >
        Guardar Salida
      </button>

      <div className="bg-slate-800 p-6 rounded-2xl overflow-auto">

        <h2 className="text-2xl font-bold mb-6">
          Historial de Salidas
        </h2>

        <table className="w-full text-left border-collapse">

          <thead className="bg-slate-700">

            <tr>

              <th className="p-3">
                Fecha
              </th>

              <th className="p-3">
                Descripción
              </th>

              <th className="p-3">
                Monto
              </th>

            </tr>

          </thead>

          <tbody>

            {salidas.map((salida) => (

              <tr
                key={salida.id}
                className="border-b border-slate-700 hover:bg-slate-700"
              >

                <td className="p-3">
                  {salida.fecha}
                </td>

                <td className="p-3">
                  {salida.descripcion}
                </td>

                <td className="p-3 text-red-400 font-bold">
                  S/ {salida.monto}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}