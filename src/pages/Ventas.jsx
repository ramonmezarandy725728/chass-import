import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

export default function Ventas() {

  const [entradas, setEntradas] = useState([]);
  const [salidas, setSalidas] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {

    const { data: entradasData } =
      await supabase
        .from("entradas")
        .select("*");

    const { data: salidasData } =
      await supabase
        .from("salidas")
        .select("*");

    setEntradas(entradasData || []);
    setSalidas(salidasData || []);
  }

  const totalEntradas = entradas.reduce(
    (acc, item) =>
      acc + Number(item.monto || 0),
    0
  );

  const totalSalidas = salidas.reduce(
    (acc, item) =>
      acc + Number(item.monto || 0),
    0
  );

  const productosMap = {};

  entradas.forEach((item) => {

    if (!productosMap[item.producto]) {
      productosMap[item.producto] = 0;
    }

    productosMap[item.producto] += Number(
      item.cantidad || 0
    );
  });

  const productosData = Object.keys(
    productosMap
  ).map((producto) => ({
    producto,
    cantidad: productosMap[producto],
  }));

  const fechaMap = {};

  entradas.forEach((item) => {

    if (!fechaMap[item.fecha]) {

      fechaMap[item.fecha] = {
        fecha: item.fecha,
        ingresos: 0,
        salidas: 0,
      };
    }

    fechaMap[item.fecha].ingresos +=
      Number(item.monto || 0);
  });

  salidas.forEach((item) => {

    if (!fechaMap[item.fecha]) {

      fechaMap[item.fecha] = {
        fecha: item.fecha,
        ingresos: 0,
        salidas: 0,
      };
    }

    fechaMap[item.fecha].salidas +=
      Number(item.monto || 0);
  });

  const fechaData =
    Object.values(fechaMap);

  const pieData = [
    {
      name: "Ingresos",
      value: totalEntradas,
    },
    {
      name: "Salidas",
      value: totalSalidas,
    },
  ];

  const COLORS = [
    "#00ff99",
    "#ff4d4f",
  ];

  return (

    <div className="text-white">

      <h1 className="text-5xl font-bold mb-10">
        Ventas y Estadísticas
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-800 p-8 rounded-3xl">

          <h2 className="text-gray-400 text-xl mb-3">
            Total Ingresos
          </h2>

          <p className="text-5xl font-bold text-green-400">
            S/ {totalEntradas}
          </p>

        </div>

        <div className="bg-slate-800 p-8 rounded-3xl">

          <h2 className="text-gray-400 text-xl mb-3">
            Total Salidas
          </h2>

          <p className="text-5xl font-bold text-red-400">
            S/ {totalSalidas}
          </p>

        </div>

        <div className="bg-slate-800 p-8 rounded-3xl">

          <h2 className="text-gray-400 text-xl mb-3">
            Ganancia
          </h2>

          <p className="text-5xl font-bold text-cyan-400">
            S/ {totalEntradas - totalSalidas}
          </p>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        <div className="bg-slate-800 p-8 rounded-3xl">

          <h2 className="text-3xl font-bold mb-8">
            Productos Más Vendidos
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart data={productosData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="producto" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="cantidad"
                fill="#3b82f6"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-slate-800 p-8 rounded-3xl">

          <h2 className="text-3xl font-bold mb-8">
            Ingresos vs Salidas
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label
              >

                {pieData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  )
                )}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-slate-800 p-8 rounded-3xl">

        <h2 className="text-3xl font-bold mb-8">
          Estadísticas por Fecha
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <LineChart data={fechaData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="fecha" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="ingresos"
              stroke="#00ff99"
              strokeWidth={4}
            />

            <Line
              type="monotone"
              dataKey="salidas"
              stroke="#ff4d4f"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}