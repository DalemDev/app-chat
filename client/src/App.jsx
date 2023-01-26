import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
const socket = io("http://localhost:4000/");

function App() {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", mensaje);
    const newMensaje = {
      body: mensaje,
      from: "Yo",
    };
    setMensajes([newMensaje, ...mensajes]);
    setMensaje("");
  };

  useEffect(() => {
    const recibirMensaje = (mensaje) => {
      setMensajes([mensaje, ...mensajes]);
    };

    socket.on("mensaje", recibirMensaje);

    return () => {
      socket.off("mensaje", recibirMensaje);
    };
  }, [mensajes]);

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
      <h1 className="tet-2xl font-bold my-2">Chat Socket.io</h1>
        <input
          type="text"
          onChange={(e) => setMensaje(e.target.value)}
          value={mensaje}
          placeholder="Escriba y pulse Enter para enviar"
          className="border-2 border-zinc-500 p-2 text-black w-full"
        />
        <ul className="h-80 overflow-y-auto">
          {mensajes.map((mensaje, index) => (
            <li key={index} className={`my-2 p-2 table text-sm rounded-md ${mensaje.from === 'Yo' ? "bg-sky-700 nl-auto" : "bg-black"}`}>
              <p>
                {mensaje.from}: {mensaje.body}
              </p>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
