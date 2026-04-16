import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import schoolRoutes from "./routes/schoolRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", schoolRoutes);

app.get("/test", (req, res) => {
  res.send("working");
});

(async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      address VARCHAR(255),
      latitude FLOAT,
      longitude FLOAT
    )
  `);
})();

const port=process.env.PORT

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
