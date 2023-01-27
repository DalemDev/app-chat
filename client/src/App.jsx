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
    setMensajes([...mensajes, newMensaje]);
    setMensaje("");
  };

  useEffect(() => {
    const recibirMensaje = (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    };

    socket.on("mensaje", recibirMensaje);

    return () => {
      socket.off("mensaje", recibirMensaje);
    };
  }, [mensajes]);

  return (
    <div className="contenedor">
      <form onSubmit={handleSubmit} className="formulario">
      <h1 className="titulo">Chat App</h1>
        <input
          type="text"
          onChange={(e) => setMensaje(e.target.value)}
          value={mensaje}
          placeholder="Escriba y pulse Enter para enviar"
          className="chat"
        />
        <ul className="mensajes">
          {mensajes.map((mensaje, index) => (
            <li key={index} className={` ${mensaje.from === 'Yo' ? "yo" : "user"}`}>
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
