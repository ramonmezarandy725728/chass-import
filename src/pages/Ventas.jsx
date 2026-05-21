import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function Ventas() {
  const [entradas, setEntradas] = useState([]);
  const [salidas, setSalidas] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    const { data: entradasData, error: errorEntradas } =
      await supabase
        .from("entradas")
        .select("*")
        .order("fecha", { ascending: true });

    const { data: salidasData, error: errorSalidas } =
      await supabase
        .from("salidas")
        .select("*")
        .order("fecha", { ascending: true });

    if (errorEntradas) {
      console.log(errorEntradas);
    }

    if (errorSalidas) {
      console.log(errorSalidas);
    }

    setEntradas(entradasData || []);
    setSalidas(salidasData || []);
  }

  const totalVendido = entradas.reduce(
    (acc, item) => acc + Number(item.monto || 0),
    0
  );

  const totalSalidas = salidas.reduce(
    (acc, item) => acc + Number(item.monto || 0),
    0
  );

  const ventasPorFecha = {};

  entradas.forEach((item) => {
    if (!ventasPorFecha[item.fecha]) {
      ventasPorFecha[item.fecha] = 0;
    }

    ventasPorFecha[item.fecha] += Number(item.monto || 0);
  });

  const datosGrafico = Object.keys(ventasPorFecha).map(
    (fecha) => ({
      fecha,
      monto: ventasPorFecha[fecha],
    })
  );

  let mejorDia = "Sin datos";

  if (datosGrafico.length > 0) {
    const mayor = datosGrafico.reduce((prev, current) =>
      prev.monto > current.monto ? prev : current
    );

    mejorDia = mayor.fecha;
  }

  const productosMap = {};

  entradas.forEach((item) => {
    if (!productosMap[item.producto]) {
      productosMap[item.producto] = 0;
    }

    productosMap[item.producto] += Number(
      item.cantidad || 0
    );
  });

  const productosGrafico = Object.keys(productosMap).map(
    (producto) => ({
      producto,
      cantidad: productosMap[producto],
    })
  );

  const flujoSemanal = [
    {
      name: "Entradas",
      monto: totalVendido,
    },
    {
      name: "Salidas",
      monto: totalSalidas,
    },
  ];

  return (
    <div className="text-white">

      <h1 className="text-6xl font-bold mb-2">
        Ventas
      </h1>

      <p className="text-gray-400 mb-10 text-2xl">
        Estadísticas semanales de ventas
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-black/40 p-8 rounded-3xl">
          <h2 className="text-3xl text-gray-300 mb-4">
            Total Vendido
          </h2>

          <p className="text-6xl font-bold text-green-400">
            S/ {totalVendido}
          </p>
        </div>

        <div className="bg-black/40 p-8 rounded-3xl">
          <h2 className="text-3xl text-gray-300 mb-4">
            Mejor Día
          </h2>

          <p className="text-5xl font-bold text-blue-400">
            {mejorDia}
          </p>
        </div>

        <div className="bg-black/40 p-8 rounded-3xl">
          <h2 className="text-3xl text-gray-300 mb-4">
            Ventas Registradas
          </h2>

          <p className="text-6xl font-bold text-yellow-400">
            {entradas.length}
          </p>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        <div className="bg-black/40 p-8 rounded-3xl">

          <h2 className="text-5xl font-bold mb-8">
            Ventas por Día
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <LineChart data={datosGrafico}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="fecha" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="monto"
                stroke="#00ff99"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        <div className="bg-black/40 p-8 rounded-3xl">

          <h2 className="text-5xl font-bold mb-8">
            Flujo Semanal
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart data={flujoSemanal}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="monto"
                fill="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-black/40 p-8 rounded-3xl">

        <h2 className="text-5xl font-bold mb-8">
          Productos Más Vendidos
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <BarChart data={productosGrafico}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="producto" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="cantidad"
              fill="#06b6d4"
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}