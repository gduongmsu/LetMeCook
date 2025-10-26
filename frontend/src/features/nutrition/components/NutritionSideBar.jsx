import './NutritionSideBar.css';
import { useState } from 'react';

function NutritionSideBar({ options, onSelect }) {

    const [selected, setSelected] = useState([]); //array for multiple selections

    const handleClick = (option) => {
        let updateSelected;
        if (selected.includes(option)) {
            updateSelected = selected.filter((item) => item !== option); //remove filter if already selected
        } else {
            updateSelected = [...selected, option]; // adds filter
        }

        setSelected(updateSelected)
        onSelect(updateSelected)
    }


    return (
        <div className="sidebar">
            <h3 className="sidebar-title">Nutrition Filters</h3>
            <div className="sidebar-options">
                {Object.entries(options).map(([key, value]) => (
                    <label
                        key={key}
                        className={`sidebar-option ${selected.includes(key) ? "selected" : ""}`}
                    >
                        <input
                            type="checkbox"
                            checked={selected.includes(key)}
                            onChange={() => handleClick(key)}
                            className="sidebar-checkbox"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className="sidebar-option-text">
                            {value.label}
                            {/* {value.label} ({value.unit}) */}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}
export default NutritionSideBar