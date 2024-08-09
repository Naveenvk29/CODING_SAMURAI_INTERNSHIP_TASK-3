import express from "express";
import cookieParser from "cookie-parser";

//
import userRoute from "./Routes/user.routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.get("/test", (req, res) => {
  res.send("Hello World!");
  console.log("Hello World!");
});

app.use("/api/users", userRoute);

export default app;
