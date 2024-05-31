const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const port = process.env.APPLICATION_PORT || 3000;
dotenv.config();
const authRouter = require("./routes/AuthRouter");
const userRouter = require("./routes/UsersRouter");
const guestRouter = require("./routes/GuestsRouter");
const typeRouter = require("./routes/TypesRouter");
const roomsRouter = require("./routes/RoomsRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { errorHandler, notFound } = require("./middleware/ErrorHandle");

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server up and Running...");
});

// routing
app.use(`/api/v1/auth`, authRouter);
app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/guests`, guestRouter);
app.use(`/api/v1/types`, typeRouter);
app.use(`/api/v1/rooms`, roomsRouter);

// not found
app.use(notFound);
// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
