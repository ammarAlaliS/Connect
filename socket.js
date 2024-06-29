import io from "socket.io-client";

const socket = io("https://obbaramarket-backend.onrender.com", {
  transports: ["websocket"],
});

export default socket;
