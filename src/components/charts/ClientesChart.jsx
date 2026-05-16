import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ClientesChart() {

  const entradas =
    JSON.parse(localStorage.getItem("entradas")) || [];

  const clientesMap = {};

  entradas.forEach((entrada) => {

    const cliente = entrada.cliente;

    const monto = Number(entrada.monto);

    if (clientesMap[cliente]) {

      clientesMap[cliente] += monto;

    } else {

      clientesMap[cliente] = monto;
    }
  });

  const data = Object.keys(clientesMap).map(
    (cliente) => ({
      cliente,
      total: clientesMap[cliente],
    })
  );

  return (
    <div className="bg-slate-950 p-6 rounded-3xl mt-10">

      <h2 className="text-3xl font-bold mb-6 text-white">
        Clientes con Más Compras
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart
          data={data}
          layout="vertical"
        >

          <XAxis
            type="number"
            stroke="#94a3b8"
          />

          <YAxis
            dataKey="cliente"
            type="category"
            stroke="#94a3b8"
            width={120}
          />

          <Tooltip />

          <Bar
            dataKey="total"
            fill="#22c55e"
            radius={[0, 10, 10, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ClientesChart;