import { Router } from "express";
import { searchRecipes } from "../services/spoonacular.js";

const r = Router();

r.get("/", async (req, res) => {
  const q = String(req.query.q || "").trim();
  if (!q) return res.status(400).json({ error: "Missing query ?q=" });
  try {
    const data = await searchRecipes({ q, limit: 10, offset: 0 });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(502).json({ error: "Upstream error" });
  }
});

export default r;
