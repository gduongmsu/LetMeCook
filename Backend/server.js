import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipesRouter from "./routes/recipes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/recipes", recipesRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend on http://localhost:${PORT}`));
