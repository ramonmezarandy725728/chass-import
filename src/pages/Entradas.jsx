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
      setEntradas(data);
    } else {
      console.log(error);
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

      setFecha("");
      setCliente("");
      setProducto("");
      setCantidad("");
      setMonto("");

      obtenerEntradas();

    } else {

      console.log(error);
      alert("Error al guardar");
    }
  };

  return (
    <div>

      <h1 className="text-4xl font-bold mb-6">
        Entradas
      </h1>

      <div className="bg-slate-800 p-6 rounded-2xl mb-6 grid md:grid-cols-2 gap-4">

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
        className="bg-blue-600 px-6 py-3 rounded-xl mb-6"
      >
        Guardar Entrada
      </button>

      <div className="bg-slate-800 p-6 rounded-2xl overflow-auto">

        <table className="w-full">

          <thead>

            <tr>

              <th>Fecha</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Monto</th>

            </tr>

          </thead>

          <tbody>

            {entradas.map((entrada) => (

              <tr key={entrada.id}>

                <td>
                  {entrada.fecha}
                </td>

                <td>
                  {entrada.cliente}
                </td>

                <td>
                  {entrada.producto}
                </td>

                <td>
                  {entrada.cantidad}
                </td>

                <td>
                  S/ {entrada.monto}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}