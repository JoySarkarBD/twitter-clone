/* global variable */
let isConnected = false;
/* socket */
const socket = io("http://localhost:3005/");

socket.emit("setup", user);

/* established a connection */
socket.on("connected", () => {
  isConnected = true;
  console.log(isConnected);
});
