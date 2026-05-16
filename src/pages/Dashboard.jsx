import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {

  const [entradas, setEntradas] = useState([]);
  const [salidas, setSalidas] = useState([]);

  const saldoInicial = 100;

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {

    const { data: entradasData } = await supabase
      .from("entradas")
      .select("*");

    const { data: salidasData } = await supabase
      .from("salidas")
      .select("*");

    setEntradas(entradasData || []);
    setSalidas(salidasData || []);
  };

  const totalEntradas = entradas.reduce(
    (acc, item) => acc + Number(item.monto),
    0
  );

  const totalSalidas = salidas.reduce(
    (acc, item) => acc + Number(item.monto),
    0
  );

  const dineroEmpresa =
    saldoInicial +
    totalEntradas -
    totalSalidas;

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">
        Inicio
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h2 className="text-xl mb-2">
            Dinero Empresa
          </h2>

          <p className="text-4xl font-bold text-green-400">
            S/ {dineroEmpresa}
          </p>

        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h2 className="text-xl mb-2">
            Entradas
          </h2>

          <p className="text-4xl font-bold text-blue-400">
            S/ {totalEntradas}
          </p>

        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">

          <h2 className="text-xl mb-2">
            Salidas
          </h2>

          <p className="text-4xl font-bold text-red-400">
            S/ {totalSalidas}
          </p>

        </div>

      </div>

      <div className="bg-slate-800 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Clientes con más compras
        </h2>

        <div className="space-y-4">

          {entradas.map((entrada) => (

            <div key={entrada.id}>

              <div className="flex justify-between mb-1">

                <span>
                  {entrada.cliente}
                </span>

                <span>
                  S/ {entrada.monto}
                </span>

              </div>

              <div className="w-full bg-slate-700 rounded-full h-4">

                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{
                    width: `${Math.min(
                      entrada.monto / 10,
                      100
                    )}%`,
                  }}
                ></div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}