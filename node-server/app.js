const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const port = 5000;

io.on("connection", (socket) => {
  console.log("----- socket connection established -----");

  socket.on("chat_message", (msg) => {
    console.log("----- chat_message event arrived -----", msg);
    io.emit("chat_message", msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
