import { useEffect, useState } from "react";

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
} from "recharts";

function Productos() {

  const [modelo, setModelo] = useState("");
  const [color, setColor] = useState("");
  const [cantidad, setCantidad] = useState("");

  const [productos, setProductos] = useState(() => {

    const datos =
      localStorage.getItem("productos");

    return datos
      ? JSON.parse(datos)
      : [];
  });

  // GUARDAR
  useEffect(() => {

    localStorage.setItem(
      "productos",
      JSON.stringify(productos)
    );

  }, [productos]);

  // AGREGAR
  const agregarProducto = () => {

    if (
      !modelo ||
      !color ||
      !cantidad
    ) {
      alert("Complete todos los campos");
      return;
    }

    const nuevoProducto = {
      modelo,
      color,
      cantidad,
    };

    setProductos([
      ...productos,
      nuevoProducto
    ]);

    setModelo("");
    setColor("");
    setCantidad("");
  };

  // ELIMINAR
  const eliminarProducto = (index) => {

    const nuevos =
      productos.filter((_, i) => i !== index);

    setProductos(nuevos);
  };

  // GRAFICO MODELOS
  const modelosMap = {};

  productos.forEach((item) => {

    const cantidad =
      Number(item.cantidad);

    if (modelosMap[item.modelo]) {

      modelosMap[item.modelo] += cantidad;

    } else {

      modelosMap[item.modelo] = cantidad;
    }
  });

  const dataModelos =
    Object.keys(modelosMap).map(
      (modelo) => ({
        modelo,
        cantidad:
          modelosMap[modelo],
      })
    );

  // GRAFICO COLORES
  const coloresMap = {};

  productos.forEach((item) => {

    const cantidad =
      Number(item.cantidad);

    if (coloresMap[item.color]) {

      coloresMap[item.color] += cantidad;

    } else {

      coloresMap[item.color] = cantidad;
    }
  });

  const dataColores =
    Object.keys(coloresMap).map(
      (color) => ({
        color,
        cantidad:
          coloresMap[color],
      })
    );

  const modeloColors = {
  "iPhone 7": "#3b82f6",
  "iPhone 8": "#22c55e",
  "iPhone X": "#8b5cf6",
  "iPhone XR": "#06b6d4",
  "iPhone XS": "#ec4899",
  "iPhone 11": "#ef4444",
  "iPhone 12": "#f59e0b",
  "iPhone 13": "#14b8a6",
  "iPhone 14": "#6366f1",
  "iPhone 15": "#84cc16",
  "iPhone 16": "#f97316",
  "iPhone 17": "#e11d48",
};

  return (
    <div className="flex-1 min-h-screen bg-slate-900 text-white p-10">

      {/* TITULO */}
      <h1 className="text-5xl font-black mb-10">
        Productos
      </h1>

      {/* FORMULARIO */}
      <div className="bg-slate-950 p-8 rounded-3xl mb-10">

        <div className="grid grid-cols-3 gap-6">

          {/* MODELO */}
          <div>

            <label className="block mb-2">
              Modelo
            </label>

            <select
              value={modelo}
              onChange={(e) =>
                setModelo(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-slate-800"
            >

              <option value="">
                Seleccione modelo
              </option>

              <option>iPhone 7</option>
              <option>iPhone 8</option>
              <option>iPhone X</option>
              <option>iPhone XR</option>
              <option>iPhone XS</option>
              <option>iPhone 11</option>
              <option>iPhone 12</option>
              <option>iPhone 13</option>
              <option>iPhone 14</option>
              <option>iPhone 15</option>
              <option>iPhone 16</option>
              <option>iPhone 17</option>

            </select>

          </div>

          {/* COLOR */}
          <div>

            <label className="block mb-2">
              Color
            </label>

            <select
              value={color}
              onChange={(e) =>
                setColor(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-slate-800"
            >

              <option value="">
                Seleccione color
              </option>

              <option>Negro</option>
              <option>Blanco</option>
              <option>Azul</option>
              <option>Rojo</option>
              <option>Dorado</option>
              <option>Plateado</option>
              <option>Morado</option>

            </select>

          </div>

          {/* CANTIDAD */}
          <div>

            <label className="block mb-2">
              Cantidad
            </label>

            <input
              type="number"
              value={cantidad}
              onChange={(e) =>
                setCantidad(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-slate-800"
            />

          </div>

        </div>

        <button
          onClick={agregarProducto}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl mt-8"
        >
          Agregar Producto
        </button>

      </div>

      {/* GRAFICOS */}
      <div className="grid grid-cols-2 gap-6 mb-10">

        {/* STOCK */}
        <div className="bg-slate-950 p-6 rounded-3xl">

          <h2 className="text-3xl font-bold mb-6">
            Stock por Modelo
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <BarChart data={dataModelos}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="modelo" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="cantidad"
                fill="#3b82f6"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* COLORES */}
        <div className="bg-slate-950 p-6 rounded-3xl">

          <h2 className="text-3xl font-bold mb-6">
            Colores Más Disponibles
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <PieChart>

              <Pie
                data={dataModelos}
                dataKey="cantidad"
                nameKey="modelo"
                outerRadius={120}
                label
              >

                {dataModelos.map(
                  (entry, index) => (

                    <Cell
  key={index}
  fill={
  modeloColors[entry.modelo] ||
  "#3b82f6"
}
/>

                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* TABLA */}
      <div className="bg-slate-950 p-6 rounded-3xl">

        <h2 className="text-3xl font-bold mb-6">
          Inventario
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="p-4 text-left">
                Modelo
              </th>

              <th className="p-4 text-left">
                Color
              </th>

              <th className="p-4 text-left">
                Cantidad
              </th>

              <th className="p-4 text-left">
                Acción
              </th>

            </tr>

          </thead>

          <tbody>

            {productos.map((producto, index) => (

              <tr
                key={index}
                className="border-b border-slate-800"
              >

                <td className="p-4">
                  {producto.modelo}
                </td>

                <td className="p-4">
                  {producto.color}
                </td>

                <td className="p-4 text-blue-400 font-bold">
                  {producto.cantidad}
                </td>

                <td className="p-4">

                  <button
                    onClick={() =>
                      eliminarProducto(index)
                    }
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Productos;