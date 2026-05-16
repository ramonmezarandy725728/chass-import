import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function Ventas() {

  const entradas =
    JSON.parse(localStorage.getItem("entradas")) || [];

  // DIAS
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  // AGRUPAR VENTAS POR DIA
  const ventasPorDia = {};

  entradas.forEach((venta) => {

    const fecha = new Date(venta.fecha);

    const dia =
      diasSemana[fecha.getDay()];

    if (ventasPorDia[dia]) {

      ventasPorDia[dia] +=
        Number(venta.monto);

    } else {

      ventasPorDia[dia] =
        Number(venta.monto);
    }
  });

  // DATA GRAFICOS
  const data = Object.keys(ventasPorDia).map(
    (dia) => ({
      dia,
      ventas: ventasPorDia[dia],
    })
  );

  // TOTAL SEMANA
  const totalSemana = data.reduce(
    (acc, item) => acc + item.ventas,
    0
  );

  // MEJOR DIA
  const mejorDia =
    data.length > 0
      ? data.reduce((max, item) =>
          item.ventas > max.ventas
            ? item
            : max
        )
      : null;

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  return (
    <div className="flex-1 min-h-screen bg-slate-900 text-white p-10">

      {/* TITULO */}
      <div className="mb-10">

        <h1 className="text-5xl font-black mb-3">
          Ventas
        </h1>

        <p className="text-slate-400 text-lg">
          Estadísticas semanales de ventas
        </p>

      </div>

      {/* TARJETAS */}
      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-950 p-6 rounded-3xl">

          <p className="text-slate-400 mb-3">
            Total Vendido
          </p>

          <h2 className="text-5xl font-black text-green-400">
            S/ {totalSemana}
          </h2>

        </div>

        <div className="bg-slate-950 p-6 rounded-3xl">

          <p className="text-slate-400 mb-3">
            Mejor Día
          </p>

          <h2 className="text-4xl font-black text-blue-400">

            {mejorDia
              ? mejorDia.dia
              : "Sin datos"}

          </h2>

        </div>

        <div className="bg-slate-950 p-6 rounded-3xl">

          <p className="text-slate-400 mb-3">
            Ventas Registradas
          </p>

          <h2 className="text-5xl font-black text-yellow-400">
            {entradas.length}
          </h2>

        </div>

      </div>

      {/* GRAFICOS */}
      <div className="grid grid-cols-2 gap-6 mb-10">

        {/* PIE CHART */}
        <div className="bg-slate-950 p-6 rounded-3xl">

          <h2 className="text-3xl font-bold mb-6">
            Ventas por Día
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <PieChart>

              <Pie
                data={data}
                dataKey="ventas"
                nameKey="dia"
                outerRadius={120}
                label
              >

                {data.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* BARRAS */}
        <div className="bg-slate-950 p-6 rounded-3xl">

          <h2 className="text-3xl font-bold mb-6">
            Flujo Semanal
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <BarChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="dia"
                stroke="#94a3b8"
              />

              <YAxis stroke="#94a3b8" />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="ventas"
                fill="#22c55e"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* TABLA */}
      <div className="bg-slate-950 p-6 rounded-3xl">

        <h2 className="text-3xl font-bold mb-6">
          Resumen Semanal
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="p-4 text-left">
                Día
              </th>

              <th className="p-4 text-left">
                Total Vendido
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((item, index) => (

              <tr
                key={index}
                className="border-b border-slate-800"
              >

                <td className="p-4">
                  {item.dia}
                </td>

                <td className="p-4 text-green-400 font-bold">
                  S/ {item.ventas}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Ventas;