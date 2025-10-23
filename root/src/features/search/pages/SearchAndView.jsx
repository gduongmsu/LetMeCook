import { useMemo, useState } from "react";
import Search from "../components/Search.jsx";           // ← use teammate's component as-is
import RecipeById from "../../recipe/components/RecipeById.jsx";   // ← your new single-recipe component

/**
 * Props:
 *   include: string  // what you already pass to Search.jsx (e.g., user query or withList)
 */
export default function SearchAndView({ include }) {
    const [searchJson, setSearchJson] = useState("");   // JSON string from Search.jsx
    const [selectedId, setSelectedId] = useState(null);

    // Parse the JSON safely (Search.jsx passes a string)
    const searchData = useMemo(() => {
        try {
            return searchJson ? JSON.parse(searchJson) : null;
        } catch {
            return null;
        }
    }, [searchJson]);

    const results = searchData?.results ?? []; // Spoonacular complexSearch returns { results: [...] }

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 16 }}>
            {/* Left: Search + clickable results */}
            <div>
                <Search include={include} handleDataFromSearch={setSearchJson} />

                <div style={{ marginTop: 12 }}>
                    <h3 style={{ margin: "8px 0" }}>
                        Results {results.length ? `(${results.length})` : ""}
                    </h3>

                    {!results.length && (
                        <p style={{ opacity: 0.7 }}>
                            No results yet — try a search or check API quota.
                        </p>
                    )}

                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
                        {results.map((r) => (
                            <li key={r.id}
                                style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, border: "1px solid #333", borderRadius: 8 }}>
                                {r.image && (
                                    <img src={r.image} alt={r.title} width={56} height={56}
                                         style={{ objectFit: "cover", borderRadius: 8 }} />
                                )}
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600 }}>{r.title}</div>
                                    <div style={{ fontSize: 12, opacity: 0.7 }}>ID: {r.id}</div>
                                </div>
                                <button onClick={() => setSelectedId(r.id)}>
                                    View
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right: Single recipe viewer */}
            <div>
                <h3 style={{ margin: "8px 0" }}>Recipe Details</h3>
                {selectedId ? (
                    <RecipeById id={selectedId} />
                ) : (
                    <p style={{ opacity: 0.7 }}>Select a recipe to see details.</p>
                )}
            </div>
        </div>
    );
}

