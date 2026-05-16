import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function LineChartBox() {

  const entradas =
    JSON.parse(localStorage.getItem("entradas")) || [];

  const salidas =
    JSON.parse(localStorage.getItem("salidas")) || [];

  // UNIR DATOS
  const dataMap = {};

  // ENTRADAS
  entradas.forEach((item) => {

    const fecha = item.fecha;

    if (!dataMap[fecha]) {

      dataMap[fecha] = {
        fecha,
        entradas: 0,
        salidas: 0,
      };
    }

    dataMap[fecha].entradas +=
      Number(item.monto);
  });

  // SALIDAS
  salidas.forEach((item) => {

    const fecha = item.fecha;

    if (!dataMap[fecha]) {

      dataMap[fecha] = {
        fecha,
        entradas: 0,
        salidas: 0,
      };
    }

    dataMap[fecha].salidas +=
      Number(item.monto);
  });

  // CONVERTIR A ARRAY
  const data = Object.values(dataMap);

  return (
    <div className="bg-slate-900/70 backdrop-blur-lg p-6 rounded-3xl border border-slate-700">

      <h2 className="text-2xl font-bold mb-6 text-white">
        Flujo de Dinero
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="fecha"
            stroke="#94a3b8"
          />

          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Legend />

          {/* LINEA VERDE */}
          <Line
            type="monotone"
            dataKey="entradas"
            stroke="#22c55e"
            strokeWidth={4}
            name="Entradas"
          />

          {/* LINEA ROJA */}
          <Line
            type="monotone"
            dataKey="salidas"
            stroke="#ef4444"
            strokeWidth={4}
            name="Salidas"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default LineChartBox;