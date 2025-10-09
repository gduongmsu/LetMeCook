export async function fetchRecipes(query) {
  const res = await fetch(`/api/recipes?q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }
  return res.json();
}
