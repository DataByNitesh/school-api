import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import schoolRoutes from "./routes/schoolRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", schoolRoutes);

app.get("/test", (req, res) => {
  res.send("working");
});

const port=process.env.PORT

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
