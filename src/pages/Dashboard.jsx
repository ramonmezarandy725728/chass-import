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
} from "recharts";

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
        .select("*");

    const { data: salidasData } =
      await supabase
        .from("salidas")
        .select("*");

    setEntradas(entradasData || []);
    setSalidas(salidasData || []);
  };

  const totalEntradas =
    entradas.reduce(
      (acc, item) =>
        acc + Number(item.monto),
      0
    );

  const totalSalidas =
    salidas.reduce(
      (acc, item) =>
        acc + Number(item.monto),
      0
    );

  const dineroEmpresa =
    saldoInicial +
    totalEntradas -
    totalSalidas;

  const datosGrafico = {};

  entradas.forEach((e) => {

    if (!datosGrafico[e.fecha]) {

      datosGrafico[e.fecha] = {
        fecha: e.fecha,
        entradas: 0,
        salidas: 0,
      };
    }

    datosGrafico[e.fecha].entradas +=
      Number(e.monto);
  });

  salidas.forEach((s) => {

    if (!datosGrafico[s.fecha]) {

      datosGrafico[s.fecha] = {
        fecha: s.fecha,
        entradas: 0,
        salidas: 0,
      };
    }

    datosGrafico[s.fecha].salidas +=
      Number(s.monto);
  });

  const chartData =
    Object.values(datosGrafico);

  return (

    <div className="text-white">

      <h1 className="text-4xl font-bold mb-8">
        Inicio
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h2 className="text-xl text-gray-300 mb-2">
            Dinero Empresa
          </h2>

          <p className="text-4xl font-bold text-green-400">
            S/ {dineroEmpresa.toFixed(2)}
          </p>

        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h2 className="text-xl text-gray-300 mb-2">
            Entradas
          </h2>

          <p className="text-4xl font-bold text-blue-400">
            S/ {totalEntradas.toFixed(2)}
          </p>

        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h2 className="text-xl text-gray-300 mb-2">
            Salidas
          </h2>

          <p className="text-4xl font-bold text-red-400">
            S/ {totalSalidas.toFixed(2)}
          </p>

        </div>

      </div>

      <div className="bg-slate-800 p-6 rounded-2xl mb-10">

        <h2 className="text-2xl font-bold mb-6">

          Estadísticas por Fecha

        </h2>

        <div style={{ width: "100%", height: 350 }}>

          <ResponsiveContainer>

            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="fecha" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="entradas"
                stroke="#22c55e"
                strokeWidth={4}
              />

              <Line
                type="monotone"
                dataKey="salidas"
                stroke="#ef4444"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-slate-800 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-6">

          Últimos Movimientos

        </h2>

        <div className="space-y-4">

          {[
            ...entradas.map((e) => ({
              tipo: "entrada",
              fecha: e.fecha,
              nombre: e.cliente,
              detalle: e.producto,
              monto: e.monto,
              id: e.id,
            })),

            ...salidas.map((s) => ({
              tipo: "salida",
              fecha: s.fecha,
              nombre: s.descripcion,
              detalle: "Gasto registrado",
              monto: s.monto,
              id: s.id,
            })),
          ]

            .sort(
              (a, b) =>
                new Date(b.fecha) -
                new Date(a.fecha)
            )

            .slice(0, 8)

            .map((movimiento) => (

              <div
                key={
                  movimiento.tipo +
                  movimiento.id
                }
                className="bg-slate-700 p-4 rounded-xl flex justify-between"
              >

                <div>

                  <p
                    className={`font-bold ${
                      movimiento.tipo ===
                      "entrada"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >

                    {movimiento.tipo ===
                    "entrada"
                      ? "Entrada"
                      : "Salida"}

                  </p>

                  <p>
                    {movimiento.nombre}
                  </p>

                  <p className="text-gray-400">
                    {movimiento.detalle}
                  </p>

                </div>

                <p
                  className={`font-bold text-2xl ${
                    movimiento.tipo ===
                    "entrada"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >

                  {movimiento.tipo ===
                  "entrada"
                    ? "+"
                    : "-"}

                  {" "}S/ {movimiento.monto}

                </p>

              </div>

            ))}

        </div>

      </div>

    </div>
  );
}