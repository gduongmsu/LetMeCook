import '../css/WITHOUT_List.css'

function WITHOUT_List({ ingredients, onRemove, onDrop, onDragOver }) {
  return (
    <div 
      className="without-list-container"
      onDrop={(e) => onDrop(e, 'without')}
      onDragOver={onDragOver}
    >
      <h3 className="list-title">WITHOUT (Exclude)</h3>
      <div className="list-content">
        {ingredients.length === 0 ? (
          <p className="empty-message">Drag ingredients here to exclude from search</p>
        ) : (
          ingredients.map((ingredient, index) => (
            <div key={ingredient.id ?? `${ingredient.name}-${index}`} className="list-item">
              <img src={ingredient.url} alt={ingredient.name} className="list-item-img" />
              <span>{ingredient.name}</span>
              <button
                className="remove-btn"
                onClick={() => onRemove(index, 'without')}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default WITHOUT_List