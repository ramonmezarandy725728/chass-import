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

  async function cargarEntradas() {

    const { data, error } = await supabase
      .from("entradas")
      .select("*")
      .order("id", {
        ascending: false,
      });

    if (!error) {
      setEntradas(data || []);
    }
  }

  async function guardarEntrada(e) {

    e.preventDefault();

    const { error } = await supabase
      .from("entradas")
      .insert([
        {
          cliente,
          producto,
          cantidad: Number(cantidad),
          monto: Number(monto),
          fecha,
        },
      ]);

    if (error) {

      console.log(error);
      alert("Error al guardar");

      return;
    }

    setCliente("");
    setProducto("");
    setCantidad("");
    setMonto("");
    setFecha("");

    cargarEntradas();
  }

  async function eliminarEntrada(id) {

    const confirmar = window.confirm(
      "¿Deseas eliminar esta entrada?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("entradas")
      .delete()
      .eq("id", id);

    if (!error) {
      cargarEntradas();
    }
  }

  return (

    <div className="text-white">

      <h1 className="text-4xl font-bold mb-8">
        Ventas
      </h1>

      <form
        onSubmit={guardarEntrada}
        className="bg-slate-800 p-6 rounded-2xl mb-8"
      >

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Cliente"
            value={cliente}
            onChange={(e) =>
              setCliente(e.target.value)
            }
            className="bg-slate-900 p-4 rounded-xl"
            required
          />

          <select
  value={producto}
  onChange={(e) =>
    setProducto(e.target.value)
  }
  className="w-full bg-slate-900 p-4 rounded-xl text-white"
>
  <option value="">
    Seleccionar Marca / Modelo
  </option>

  <option>iPhone 7</option>
  <option>iPhone 7 Plus</option>

  <option>iPhone 8</option>
  <option>iPhone 8 Plus</option>

  <option>iPhone X</option>
  <option>iPhone XR</option>
  <option>iPhone XS</option>
  <option>iPhone XS Max</option>

  <option>iPhone 11</option>
  <option>iPhone 11 Pro</option>
  <option>iPhone 11 Pro Max</option>

  <option>iPhone 12</option>
  <option>iPhone 12 Mini</option>
  <option>iPhone 12 Pro</option>
  <option>iPhone 12 Pro Max</option>

  <option>iPhone 13</option>
  <option>iPhone 13 Mini</option>
  <option>iPhone 13 Pro</option>
  <option>iPhone 13 Pro Max</option>

  <option>iPhone 14</option>
  <option>iPhone 14 Plus</option>
  <option>iPhone 14 Pro</option>
  <option>iPhone 14 Pro Max</option>

  <option>iPhone 15</option>
  <option>iPhone 15 Plus</option>
  <option>iPhone 15 Pro</option>
  <option>iPhone 15 Pro Max</option>

  <option>iPhone 16</option>
  <option>iPhone 16 Plus</option>
  <option>iPhone 16 Pro</option>
  <option>iPhone 16 Pro Max</option>

  <option>iPhone 17</option>
<option>iPhone 17 Plus</option>
<option>iPhone 17 Pro</option>
<option>iPhone 17 Pro Max</option>
<option>iPhone 17 Air</option>
</select>
            value={producto}
            onChange={(e) =>
              setProducto(e.target.value)
            }
            className="bg-slate-900 p-4 rounded-xl"
            required
          /

          <input
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) =>
              setCantidad(e.target.value)
            }
            className="bg-slate-900 p-4 rounded-xl"
            required
          />

          <input
            type="number"
            placeholder="Monto"
            value={monto}
            onChange={(e) =>
              setMonto(e.target.value)
            }
            className="bg-slate-900 p-4 rounded-xl"
            required
          />

          <input
            type="date"
            value={fecha}
            onChange={(e) =>
              setFecha(e.target.value)
            }
            className="bg-slate-900 p-4 rounded-xl"
            required
          />

        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl mt-6"
        >

          Guardar Venta

        </button>

      </form>

      <div className="bg-slate-800 p-6 rounded-2xl">

        <h2 className="text-3xl font-bold mb-6">
          Historial de Ventas
        </h2>

        <div className="overflow-auto">

          <table className="w-full">

            <thead>

              <tr className="text-left border-b border-slate-600">

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
                  Acción
                </th>

              </tr>

            </thead>

            <tbody>

              {entradas.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-700"
                >

                  <td className="p-4">
                    {item.fecha}
                  </td>

                  <td className="p-4">
                    {item.cliente}
                  </td>

                  <td className="p-4">
                    {item.producto}
                  </td>

                  <td className="p-4">
                    {item.cantidad}
                  </td>

                  <td className="p-4 text-green-400 font-bold">
                    S/ {item.monto}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        eliminarEntrada(item.id)
                      }
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

    </div>
  );
}