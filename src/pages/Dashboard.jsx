import BarChartBox from "../components/charts/BarChartBox";
import KpiCard from "../components/KpiCard";

import LineChartBox from "../components/charts/LineChartBox";

function Dashboard({
  dineroEmpresa,
  dineroEntrante,
  dineroSaliente,
}) {

  const entradas =
    JSON.parse(localStorage.getItem("entradas")) || [];

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 p-8 text-white">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-6xl font-black mb-3">
          Inicio
        </h1>

        <p className="text-slate-400 text-xl">
          Control financiero de CHASS IMPORT
        </p>

      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <KpiCard
          titulo="Dinero Empresa"
          valor={`S/ ${dineroEmpresa}`}
          color="text-yellow-400"
        />

        <KpiCard
          titulo="Entradas"
          valor={`S/ ${dineroEntrante}`}
          color="text-green-400"
        />

        <KpiCard
          titulo="Salidas"
          valor={`S/ ${dineroSaliente}`}
          color="text-red-400"
        />

        <KpiCard
          titulo="Ventas"
          valor={entradas.length}
          color="text-cyan-400"
        />

      </div>

      {/* GRAFICOS */}
      <div className="grid grid-cols-2 gap-6 mb-10">

        <div className="space-y-6">

      <LineChartBox />

      <BarChartBox />

      </div>

        {/* RESUMEN */}
        <div className="bg-slate-900/70 backdrop-blur-lg p-8 rounded-3xl border border-slate-700">

          <h2 className="text-3xl font-bold mb-6">
            Resumen Empresarial
          </h2>

          <div className="space-y-5">

            <div className="bg-slate-800 p-5 rounded-2xl">

              <p className="text-slate-400 mb-2">
                Estado Financiero
              </p>

              <h3 className="text-4xl font-black text-green-400">
                Estable
              </h3>

            </div>

            <div className="bg-slate-800 p-5 rounded-2xl">

              <p className="text-slate-400 mb-2">
                Total Movimientos
              </p>

              <h3 className="text-4xl font-black text-cyan-400">
                {entradas.length}
              </h3>

            </div>

            <div className="bg-slate-800 p-5 rounded-2xl">

              <p className="text-slate-400 mb-2">
                Empresa
              </p>

              <h3 className="text-3xl font-black text-yellow-400">
                CHASS IMPORT
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* MOVIMIENTOS */}
      <div className="bg-slate-900/70 backdrop-blur-lg p-8 rounded-3xl border border-slate-700">

        <h2 className="text-3xl font-bold mb-6">
          Últimos Movimientos
        </h2>

        <div className="space-y-4">

          {entradas.slice(-5).reverse().map((entrada, index) => (

            <div
              key={index}
              className="bg-slate-800 p-5 rounded-2xl flex justify-between items-center"
            >

              <div>

                <h3 className="font-bold text-xl">
                  {entrada.cliente}
                </h3>

                <p className="text-slate-400">
                  {entrada.descripcion}
                </p>

              </div>

              <div className="text-3xl font-black text-green-400">

                S/ {entrada.monto}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;