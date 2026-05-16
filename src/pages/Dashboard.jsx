import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { supabase } from "../lib/supabase";

export default function Dashboard() {

  const [entradas, setEntradas] = useState([]);
  const [salidas, setSalidas] = useState([]);

  const saldoInicial = 100;

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {

    const { data: entradasData } =
      await supabase
        .from("entradas")
        .select("*")
        .order("fecha", {
          ascending: true,
        });

    const { data: salidasData } =
      await supabase
        .from("salidas")
        .select("*")
        .order("fecha", {
          ascending: true,
        });

    setEntradas(entradasData || []);
    setSalidas(salidasData || []);
  };

  const totalEntradas = entradas.reduce(
    (acc, item) =>
      acc + Number(item.monto),
    0
  );

  const totalSalidas = salidas.reduce(
    (acc, item) =>
      acc + Number(item.monto),
    0
  );

  const dineroEmpresa =
    saldoInicial +
    totalEntradas -
    totalSalidas;

  const productosMap = {};

  entradas.forEach((entrada) => {

    if (!productosMap[entrada.producto]) {
      productosMap[entrada.producto] = 0;
    }

    productosMap[entrada.producto] += Number(
      entrada.cantidad
    );
  });

  const productos = Object.entries(productosMap);

  const chartData = [];

  entradas.forEach((entrada) => {

    chartData.push({
      fecha: entrada.fecha,
      ingresos: Number(entrada.monto),
      salidas: 0,
    });
  });

  salidas.forEach((salida) => {

    chartData.push({
      fecha: salida.fecha,
      ingresos: 0,
      salidas: Number(salida.monto),
    });
  });

  chartData.sort((a, b) =>
    new Date(a.fecha) - new Date(b.fecha)
  );

  return (

    <div className="text-white">

      <h1 className="text-4xl font-bold mb-8">
        Inicio
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">

          <h2 className="text-gray-400 mb-2">
            Dinero Empresa
          </h2>

          <p className="text-4xl font-bold text-green-400">
            S/ {dineroEmpresa}
          </p>

        </div>

        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">

          <h2 className="text-gray-400 mb-2">
            Entradas
          </h2>

          <p className="text-4xl font-bold text-blue-400">
            S/ {totalEntradas}
          </p>

        </div>

        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">

          <h2 className="text-gray-400 mb-2">
            Salidas
          </h2>

          <p className="text-4xl font-bold text-red-400">
            S/ {totalSalidas}
          </p>

        </div>

        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">

          <h2 className="text-gray-400 mb-2">
            Balance
          </h2>

          <p className="text-4xl font-bold text-yellow-400">
            {totalEntradas - totalSalidas >= 0
              ? "POSITIVO"
              : "NEGATIVO"}
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Productos Más Vendidos
          </h2>

          <div className="space-y-5">

            {productos.map(([producto, cantidad]) => (

              <div key={producto}>

                <div className="flex justify-between mb-2">

                  <span>
                    {producto}
                  </span>

                  <span>
                    {cantidad}
                  </span>

                </div>

                <div className="w-full bg-slate-700 rounded-full h-6">

                  <div
                    className="bg-cyan-500 h-6 rounded-full"
                    style={{
                      width: `${Math.min(
                        cantidad * 10,
                        100
                      )}%`,
                    }}
                  ></div>

                </div>

              </div>

            ))}

          </div>

        </div>

        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Flujo de Dinero
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="fecha" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="ingresos"
                stroke="#3b82f6"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="salidas"
                stroke="#ef4444"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Últimos Movimientos
        </h2>

        <div className="space-y-4">

          {entradas.slice(-5).map((entrada) => (

            <div
              key={entrada.id}
              className="bg-slate-700 p-4 rounded-xl flex justify-between"
            >

              <div>

                <p className="font-bold">
                  {entrada.cliente}
                </p>

                <p className="text-gray-400">
                  {entrada.producto}
                </p>

              </div>

              <p className="text-green-400 font-bold">
                + S/ {entrada.monto}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}