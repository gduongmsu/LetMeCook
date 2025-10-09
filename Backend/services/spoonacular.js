import fetch from "node-fetch";

const API = "https://api.spoonacular.com";
const KEY = process.env.SPOONACULAR_KEY;
if (!KEY) throw new Error("SPOONACULAR_KEY missing");

export async function searchRecipes({ q, limit = 10, offset = 0 }) {
  const qs = new URLSearchParams({
    apiKey: KEY,
    query: q,
    number: String(limit),
    offset: String(offset)
  });
  const res = await fetch(`${API}/recipes/complexSearch?${qs}`);
  if (!res.ok) throw new Error(`Spoonacular ${res.status}`);
  return res.json();
}
