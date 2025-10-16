import { Link, useParams } from "react-router-dom";
import RecipeById from "../../Components/Recipe/RecipeById";

export default function RecipePage() {
    const { id } = useParams();

    return (
        <div style={{ padding: "1rem" }}>
            <Link
                to="/"
                style={{
                    color: "#60a5fa",
                    textDecoration: "none",
                    marginBottom: "1rem",
                    display: "inline-block",
                }}
            >
                ← Back to Search
            </Link>

            <RecipeById id={id} />
        </div>
    );
}


