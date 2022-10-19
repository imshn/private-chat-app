import { io } from "socket.io-client";
const localUser = JSON.parse(localStorage.getItem("user"));
const socket = io("http://localhost:8080");

socket.on("disconnect", (reason) => {
  if (reason === "io server disconnect") {
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
    socket.emit("login", localUser._id);
  }
});

export default socket;
