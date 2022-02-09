const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const User = require("../models/User");
const cors = require("cors");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const initializePassport = require("../passport-config");
const generateUploadURL = require("./s3");

initializePassport(
  passport,
  (email) => User.findOne({ email: email }),
  (user) => User.findById(user.id)
);

const server = http.createServer(app);
const router = express.Router();
const mongoose = require("mongoose");
const port = process.env.PORT || 4001;

const usersRoute = require("../routes/users");
const signUpRoute = require("../routes/signup");
const loginRoute = require("../routes/login");
const chatRoute = require("../routes/chatroom");
const messageRoute = require("../routes/message");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(flash());
app.use(
  session({
    secret: "ahahha123",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser("ahahha123"));
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", usersRoute);
app.use("/signup", signUpRoute);
app.use("/login", loginRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);

app.use(express.static(__dirname + "../../websockets/build"));

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

mongoose.connect(
  "mongodb+srv://conneru:abc1234@cluster0.75usw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("joinRoom", (room) => {
    if (socket.rooms.size > 1) {
      let lastRoom = Array.from(socket.rooms).pop();
      socket.leave(lastRoom);
    }

    socket.join(room);
    // console.log(socket.rooms);
  });
  socket.on("message", (msg, room) => {
    io.in(room).emit("add", msg, room);
    // io.emit("add", msg);
    // console.log(socket.rooms);
    console.log("message sent");
  });

  socket.on("delete", (room) => {
    io.in(room).emit("update");
  });
});

app.get("/s3Url", async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

app.get("/logout", async (req, res) => {
  req.logOut();
  res.redirect("/");
});

server.listen(port, () => {
  console.log("listening on *:4001");
});