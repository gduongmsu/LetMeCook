import { useEffect, useState } from "react";

const BASE = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = import.meta.env.VITE_SPOONACULAR_KEY;

export default function Search({ include, handleDataFromSearch }) {
    const [resp, setResp] = useState(null);
    const [status, setStatus] = useState("idle"); // idle|loading|error|success
    const [err, setErr] = useState("");

    useEffect(() => {
        async function fetchFood() {
            if (!include) return;
            if (!apiKey) {
                setStatus("error");
                setErr("Missing API key. Set VITE_SPOONACULAR_KEY in frontend/.env");
                handleDataFromSearch?.(JSON.stringify({ results: [] }, null, 2));
                return;
            }

            try {
                setStatus("loading");
                setErr("");
                setResp(null);

                const qs = new URLSearchParams({
                    query: include,
                    number: "10",
                    apiKey,
                });

                const url = `${BASE}?${qs.toString()}`;
                const res = await fetch(url);

                if (!res.ok) {
                    // surface common issues
                    let hint = "";
                    if (res.status === 401) hint = "Invalid API key";
                    if (res.status === 402) hint = "Quota exceeded";
                    const text = await res.text().catch(() => "");
                    console.error("Spoonacular error", res.status, hint, text);
                    throw new Error(`${res.status} ${hint}`);
                }

                const data = await res.json();
                setResp(data);
                setStatus("success");
                handleDataFromSearch?.(JSON.stringify(data, null, 2));
            } catch (e) {
                setStatus("error");
                setErr(e?.message || "Unknown error");
                setResp({ results: [] });
                handleDataFromSearch?.(JSON.stringify({ results: [] }, null, 2));
            }
        }

        fetchFood();
    }, [include]);

    return (
        <div className="SearchReturn" style={{ textAlign: "center", opacity: 0.6 }}>
            {status === "idle" && <p>Type ingredients to search…</p>}
            {status === "loading" && <p>Searching…</p>}
            {status === "error" && <p style={{ opacity: 1 }}>Error: {err}</p>}
            {status === "success" &&
                (resp?.results?.length ? (
                    <p>Found {resp.results.length} recipes</p>
                ) : (
                    <p>No recipes found.</p>
                ))}
        </div>
    );
}