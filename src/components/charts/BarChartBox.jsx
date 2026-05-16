import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function BarChartBox() {

  const entradas =
    JSON.parse(localStorage.getItem("entradas")) || [];

  const productosMap = {};

  entradas.forEach((entrada) => {

    const producto = entrada.producto;

    const cantidad = Number(entrada.cantidad);

    if (productosMap[producto]) {

      productosMap[producto] += cantidad;

    } else {

      productosMap[producto] = cantidad;
    }
  });

  const data = Object.keys(productosMap).map(
    (producto) => ({
      producto,
      total: productosMap[producto],
    })
  );

  return (
    <div className="bg-slate-900/70 p-6 rounded-3xl">

      <h2 className="text-2xl font-bold mb-6 text-white">
        Productos Más Vendidos
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart
          data={data}
          layout="vertical"
        >

          <XAxis type="number" />

          <YAxis
            dataKey="producto"
            type="category"
            width={140}
          />

          <Tooltip />

          <Bar
            dataKey="total"
            fill="#38bdf8"
            radius={[0, 10, 10, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default BarChartBox;