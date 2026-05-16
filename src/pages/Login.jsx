import { useState } from "react";

function Login({ setLogeado }) {

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = () => {

    if (
      usuario === "chassimport" &&
      password === "12345678"
    ) {

      localStorage.setItem(
        "logeado",
        "true"
      );

      setLogeado(true);

    } else {

      alert(
        "Usuario o contraseña incorrectos"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 p-10 rounded-3xl w-[400px] border border-slate-700">

        <h1 className="text-5xl font-black text-white mb-10 text-center">
          CHASS IMPORT
        </h1>

        {/* USUARIO */}
        <div className="mb-6">

          <label className="block text-white mb-2">
            Usuario
          </label>

          <input
            type="text"
            value={usuario}
            onChange={(e) =>
              setUsuario(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-slate-800 text-white"
          />

        </div>

        {/* PASSWORD */}
        <div className="mb-8">

          <label className="block text-white mb-2">
            Contraseña
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-slate-800 text-white"
          />

        </div>

        {/* BOTON */}
        <button
          onClick={iniciarSesion}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-lg font-bold"
        >
          Ingresar
        </button>

      </div>

    </div>
  );
}

export default Login;