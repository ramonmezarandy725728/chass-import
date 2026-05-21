import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Ventas() {

  const [ventas, setVentas] = useState([]);

  const [cliente, setCliente] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    cargarVentas();
  }, []);

  async function cargarVentas() {

    const { data, error } = await supabase
      .from("ventas")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setVentas(data);
    }
  }

  async function guardarVenta(e) {

    e.preventDefault();

    const { error } = await supabase
      .from("ventas")
      .insert([
        {
          cliente,
          producto,
          cantidad,
          monto,
          fecha,
        },
      ]);

    if (!error) {

      setCliente("");
      setProducto("");
      setCantidad("");
      setMonto("");
      setFecha("");

      cargarVentas();
    }
  }

  async function eliminarVenta(id) {

    const confirmar = window.confirm(
      "¿Deseas eliminar esta venta?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("ventas")
      .delete()
      .eq("id", id);

    if (!error) {
      cargarVentas();
    }
  }

  return (

    <div className="text-white">

      <h1 className="text-5xl font-bold mb-10">
        Ventas
      </h1>

      <form
        onSubmit={guardarVenta}
        className="bg-slate-800 p-8 rounded-3xl mb-10"
      >

        <div className="grid md:grid-cols-2 gap-6">

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
            className="bg-slate-900 p-4 rounded-xl"
            required
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

            <option>iPhone 12 Mini</option>
            <option>iPhone 12</option>
            <option>iPhone 12 Pro</option>
            <option>iPhone 12 Pro Max</option>

            <option>iPhone 13 Mini</option>
            <option>iPhone 13</option>
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
            type="date"
            value={fecha}
            onChange={(e) =>
              setFecha(e.target.value)
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

        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-2xl mt-8 text-xl font-bold"
        >
          Guardar Venta
        </button>

      </form>

      <div className="bg-slate-800 p-8 rounded-3xl">

        <h2 className="text-4xl font-bold mb-8">
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

              {ventas.map((venta) => (

                <tr
                  key={venta.id}
                  className="border-b border-slate-700"
                >

                  <td className="p-4">
                    {venta.fecha}
                  </td>

                  <td className="p-4">
                    {venta.cliente}
                  </td>

                  <td className="p-4">
                    {venta.producto}
                  </td>

                  <td className="p-4">
                    {venta.cantidad}
                  </td>

                  <td className="p-4 text-green-400 font-bold">
                    S/ {venta.monto}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        eliminarVenta(venta.id)
                      }
                      className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl font-bold"
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