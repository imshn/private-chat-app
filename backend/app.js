require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const usersRoutes = require("./routers/users");
const chatRoutes = require("./routers/chats");
const server = http.createServer(app);
const { authenticateToken } = require("./middleware/auth");
const { Server } = require("socket.io");
const { createMessage } = require("./controllers/chatController");

app.use(helmet());
app.use(helmet.hidePoweredBy());
const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (
    [
      "http://localhost:5173",
      "https://admin.socket.io",
      "http://127.0.0.1:5173",
    ].includes(origin)
  ) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
app.use(credentials);
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        [
          "http://localhost:5173",
          "https://admin.socket.io",
          "http://127.0.0.1:5173",
        ].indexOf(origin) !== -1 ||
        !origin
      ) {
        callback(null, true);
      } else {
        console.log("CORS error");
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  })
);

app.use(
  express.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);

// app.use(authenticateToken);
app.use("/users", usersRoutes);
app.use("/chat", chatRoutes);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const OnlineUsers = new Map();
io.on("connection", function (socket) {
  socket.on("login", (userId) => {
    OnlineUsers.set(socket.id, userId);
    console.log(OnlineUsers);
  });

  socket.on("private", (data) => {
    socket.join(data.to);
    socket.to(data.to).emit("private", data);
  });
});

const connectDb = () => {
  const conn = mongoose.connect(process.env.MONGODB_URI);
  return conn;
};

const PORT = process.env.PORT || 8080;
server.listen(8080, () => {
  connectDb().then((conn) => {
    console.log("Connected to localhost at " + PORT);
  });
});
