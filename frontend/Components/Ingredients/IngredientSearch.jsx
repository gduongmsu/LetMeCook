import { useEffect, useMemo, useState } from "react";
import FancyIngredientCard from "./FancyIngredientCard/FancyIngredientCard.jsx";
import cache from "../../src/lib/ttlCache.js";
import { ingredientImgUrl } from "../../src/utils/spoonacular.js";

const BASE = "https://api.spoonacular.com/food/ingredients/search";

export default function IngredientSearch({
                                             query = "",
                                             number = 16,
                                             ttlMs = 10 * 60 * 1000, // 10 min cache
                                             onResults,
                                             onCardDragStart,
                                             onCardLeftClick,
                                             onCardRightClick,
                                         }) {
    const [status, setStatus] = useState("idle");
    const [err, setErr] = useState("");
    const [items, setItems] = useState([]);

    const apiKey = useMemo(() => import.meta.env.VITE_SPOONACULAR_KEY || "", []);

    // Debounce to reduce API calls
    const [debounced, setDebounced] = useState(query);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(query.trim()), 600);
        return () => clearTimeout(t);
    }, [query]);

    useEffect(() => {
        const q = debounced;
        if (!q) {
            setStatus("idle");
            setItems([]);
            onResults?.([]);
            return;
        }
        if (!apiKey) {
            setStatus("error");
            setErr("Missing API key (VITE_SPOONACULAR_KEY). Add it to frontend/.env");
            return;
        }

        const key = `ingredients:${q}:${number}`;
        const hit = cache.get(key);
        if (hit) {
            setItems(hit);
            onResults?.(hit);
            setStatus("success");
            return;
        }

        (async () => {
            try {
                setStatus("loading");
                setErr("");

                const url = new URL(BASE);
                url.searchParams.set("query", q);
                url.searchParams.set("number", String(number));
                url.searchParams.set("apiKey", apiKey);

                const res = await fetch(url);
                if (!res.ok) {
                    let hint = "";
                    if (res.status === 401) hint = "Invalid API key";
                    if (res.status === 402) hint = "Quota exceeded";
                    throw new Error(`HTTP ${res.status} ${hint}`);
                }

                const data = await res.json();
                const cards = (data?.results ?? []).map((it) => ({
                    id: it.id,
                    name: cap(it.name),
                    image: ingredientImgUrl(it.image, "250x250"),
                }));

                cache.set(key, cards, ttlMs);
                setItems(cards);
                onResults?.(cards);
                setStatus("success");
            } catch (e) {
                setStatus("error");
                setErr(e?.message || "Unknown error");
                setItems([]);
                onResults?.([]);
            }
        })();
    }, [debounced, number, ttlMs, apiKey, onResults]);

    return (
        <div style={{ display: "grid", gap: 16 }}>
            {status === "idle" && <p style={{ opacity: 0.6 }}>Type to search ingredients…</p>}
            {status === "loading" && <p>Loading ingredients…</p>}
            {status === "error" && <p style={{ color: "crimson" }}>Error: {err}</p>}
            {status === "success" && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                        gap: 16,
                    }}
                >
                    {items.map((ing) => (
                        <FancyIngredientCard
                            key={ing.id}
                            ingredient={ing}
                            onDragStart={onCardDragStart}
                            onLeftClick={onCardLeftClick}
                            onRightClick={onCardRightClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function cap(s = "") {
    return s ? s[0].toUpperCase() + s.slice(1) : s;
}