import "./FancyIngredientCard.css";

export default function FancyIngredientCard({ ingredient, onDragStart, onLeftClick, onRightClick }) {
    if (!ingredient) return null;
    const { id, name, image } = ingredient;

    const handleKey = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onLeftClick?.(ingredient);
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        onRightClick?.(ingredient);
    };

    return (
        <div
            className="fancy-card has-tip"
            data-tip={"Left click → add to WITH\nRight click → add to WITHOUT"}
            draggable
            onDragStart={(e) => onDragStart?.(e, ingredient, "cards")}
            onClick={() => onLeftClick?.(ingredient)}
            onContextMenu={handleContextMenu}
            onKeyDown={handleKey}
            role="button"
            aria-label={`Select ${name}`}
            tabIndex={0}
        >
            <div className="thumb">
                {image ? <img src={image} alt={name} /> : <div className="placeholder" />}
            </div>
            <div className="meta">
                <div className="title">{name}</div>
                {/* <div className="sub">ID: {id}</div> */}
            </div>
        </div>
    );
}