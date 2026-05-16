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
      .order("created_at", { ascending: false });

    if (!error) {
      setEntradas(data);
    }
  };

  const guardarEntrada = async () => {
    if (!fecha || !cliente || !producto || !cantidad || !monto) {
      alert("Completa todos los campos");
      return;
    }

    const nuevaEntrada = {
      fecha,
      cliente,
      producto,
      cantidad: Number(cantidad),
      monto: Number(monto),
    };

    const { error } = await supabase
      .from("entradas")
      .insert([nuevaEntrada]);

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
    <div className="p-6 text-white">
      <h1 className="text-4xl font-bold mb-6">
        Registro de Entradas
      </h1>

      <div className="bg-[#0f172a] p-6 rounded-2xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full p-3 rounded bg-[#1e293b]"
            />
          </div>

          <div>
            <label>Cliente</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="w-full p-3 rounded bg-[#1e293b]"
            />
          </div>

          <div>
            <label>Producto</label>
            <select
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
              className="w-full p-3 rounded bg-[#1e293b]"
            >
              <option value="">Seleccione</option>
              <option>iPhone Mixtos</option>
              <option>iPhone 15</option>
              <option>iPhone 16</option>
              <option>iPhone 17</option>
              <option>Productos Externos</option>
            </select>
          </div>

          <div>
            <label>Cantidad</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full p-3 rounded bg-[#1e293b]"
            />
          </div>

          <div>
            <label>Monto</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="w-full p-3 rounded bg-[#1e293b]"
            />
          </div>
        </div>

        <button
          onClick={guardarEntrada}
          className="mt-6 bg-blue-600 px-6 py-3 rounded-xl"
        >
          Guardar Entrada
        </button>
      </div>

      <div className="bg-[#0f172a] p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Historial de Entradas
        </h2>

        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="p-2">Fecha</th>
                <th className="p-2">Cliente</th>
                <th className="p-2">Producto</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">Monto</th>
              </tr>
            </thead>

            <tbody>
              {entradas.map((entrada) => (
                <tr
                  key={entrada.id}
                  className="border-b border-gray-800"
                >
                  <td className="p-2">{entrada.fecha}</td>
                  <td className="p-2">{entrada.cliente}</td>
                  <td className="p-2">{entrada.producto}</td>
                  <td className="p-2">{entrada.cantidad}</td>
                  <td className="p-2">
                    S/ {entrada.monto}
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