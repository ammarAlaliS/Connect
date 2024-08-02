import io from "socket.io-client";

const socket = io("https://obbaramarket-backend.onrender.com", {
  transports: ["websocket"],
});

socket.on('connect', () => {
  console.log('Socket conectado');
});

socket.on('disconnect', () => {
  console.log('Socket desconectado');
});

export default socket;
