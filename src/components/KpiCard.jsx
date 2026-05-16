function KpiCard({ titulo, valor, color }) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow border border-slate-700">

      <h3 className="text-gray-300 mb-2">
        {titulo}
      </h3>

      <p className={`text-3xl font-bold ${color}`}>
        {valor}
      </p>

    </div>
  );
}

export default KpiCard;