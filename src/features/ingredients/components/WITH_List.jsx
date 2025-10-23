import './WITH_List.css'

function WITH_List({ ingredients, onRemove, onDrop, onDragOver }) {
  return (
    <div 
      className="with-list-container"
      onDrop={(e) => onDrop(e, 'with')}
      onDragOver={onDragOver}
    >
      <h3 className="list-title">WITH (Include)</h3>
      <div className="list-content">
        {ingredients.length === 0 ? (
          <p className="empty-message">Drag ingredients here to include in search</p>
        ) : (
          ingredients.map((ingredient, index) => (
            <div key={ingredient.id} className="list-item">
              <img src={ingredient.url} alt={ingredient.name} className="list-item-img" />
              <span>{ingredient.name}</span>
              <button
                className="remove-btn"
                onClick={() => onRemove(index, 'with')}
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

export default WITH_List
