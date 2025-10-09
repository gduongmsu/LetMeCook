import { useState } from "react";
import { fetchRecipes } from "../api/recipes";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("query");

    setLoading(true);
    try {
      const data = await fetchRecipes(query);
      setRecipes(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input name="query" placeholder="Search recipes..." />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      <ul>
        {recipes.map(r => (
          <li key={r.id}>
            {r.title} {r.image && <img src={r.image} alt={r.title} width="80" />}
          </li>
        ))}
      </ul>
    </div>
  );
}
