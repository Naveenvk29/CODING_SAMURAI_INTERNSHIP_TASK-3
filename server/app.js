import express from "express";
import cookieParser from "cookie-parser";

//
import userRoute from "./Routes/user.routes.js";
import blogRoutes from "./Routes/blog.routes.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.get("/test", (req, res) => {
  res.send("Hello World!");
  console.log("Hello World!");
});

app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoutes);

export default app;
