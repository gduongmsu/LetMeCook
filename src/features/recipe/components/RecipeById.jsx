import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function RecipeById({ id, onData }) {
    const [recipe, setRecipe] = useState(null);
    const [status, setStatus] = useState("idle");
    const [err, setErr] = useState("");
    const apiKey = import.meta.env.VITE_SPOONACULAR_KEY || "";

    useEffect(() => {
        const recipeId = String(id ?? "").trim();

        if (!recipeId) {
            setStatus("idle");
            setRecipe(null);
            setErr("");
            return;
        }
        if (!apiKey) {
            setStatus("error");
            setErr("Missing API key. Set VITE_SPOONACULAR_KEY in your .env file.");
            return;
        }

        (async () => {
            try {
                setStatus("loading");
                setErr("");
                setRecipe(null);

                const url = `https://api.spoonacular.com/recipes/${encodeURIComponent(
                    recipeId
                )}/information?includeNutrition=false&apiKey=${encodeURIComponent(apiKey)}`;

                const res = await fetch(url);
                if (!res.ok) {
                    let hint = "";
                    if (res.status === 401) hint = " (Invalid API key)";
                    if (res.status === 402) hint = " (Quota exceeded)";
                    if (res.status === 404) hint = " (Recipe not found)";
                    throw new Error(`HTTP ${res.status}${hint}`);
                }

                const data = await res.json();
                setRecipe(data);
                setStatus("success");
                onData && onData(JSON.stringify(data, null, 2));
            } catch (e) {
                setStatus("error");
                setErr(e?.message || "Unknown error");
            }
        })();
    }, [id, apiKey, onData]);

    const handlePrint = () => {
        window.print();
    }



    // ===== UI RENDERING =====================================================
    if (status === "idle") return <p>Pick a recipe to see details.</p>;
    if (status === "loading") return <p>Loading recipe details…</p>;
    if (status === "error") return <p style={{ color: "crimson" }}>Error: {err}</p>;

    if (!recipe) return null;

    return (
        <div
            style={{
                background: "#1f2937",
                borderRadius: 10,
                padding: 20,
                color: "#e5e7eb",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h3 style={{ margin: 0 }}>{recipe.title}</h3>
                <button
                    onClick={handlePrint}
                    className="print-button"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "22px",
                        height: "22px",
                        backgroundColor: "#374151",
                        color: "#60a5fa",
                        borderRadius: "4px",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4b5563")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
                >
                    🖨
                </button>
            </div>
            {recipe.image && (
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{
                        width: "100%",
                        maxWidth: 400,
                        borderRadius: 8,
                        marginBottom: 12,
                    }}
                />
            )}
            <p>
                <strong>Ready in:</strong> {recipe.readyInMinutes} minutes
            </p>
            <p>
                <strong>Servings:</strong> {recipe.servings}
            </p>
            <p>
                <strong>Source:</strong>{" "}
                <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#60a5fa" }}
                >
                    View Original Recipe
                </a>
            </p>

            <h4>Summary</h4>
            <div
                dangerouslySetInnerHTML={{
                    __html: recipe.summary || "No summary available.",
                }}
                style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "#d1d5db",
                }}
            />

            {recipe.extendedIngredients && (
                <>
                    <h4>Ingredients</h4>
                    <ul style={{ marginTop: 4 }}>
                        {recipe.extendedIngredients.map((ing) => (
                            <li key={ing.id || ing.name}>{ing.original}</li>
                        ))}
                    </ul>
                </>
            )}

            {recipe.instructions && (
                <>
                    <h4>Instructions</h4>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: recipe.instructions,
                        }}
                        style={{ fontSize: 14, lineHeight: 1.6 }}
                    />
                </>
            )}
        </div>
    );
}
