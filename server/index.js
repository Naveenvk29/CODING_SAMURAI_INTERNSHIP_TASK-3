import dotenv from "dotenv";
import ConnectDB from "./Config/index.DB.js";
import app from "./app.js";
dotenv.config();

const PORT = process.env.PORT || 8000;

ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
