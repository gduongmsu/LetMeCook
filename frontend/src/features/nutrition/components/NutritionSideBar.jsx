import './NutritionSideBar.css';
import { useState } from 'react';

function NutritionSideBar({ options, onSelect }) {

    const [selected, setSelected] = useState([]); //array for multiple selections

    const handleClick = (option) => {
        let updateSelected;
        if (selected.includes(option)) {
            updateSelected = selected.filter((item) => item !== option); //remove if already selected
        } else {
            updateSelected = [...selected, option];
        }

        setSelected(updateSelected)
        onSelect(updateSelected)
    }


    return (

        <div className="sidebar">
            <h3 className="sidebar-title">Nutrition Filters</h3>
            <div className="sidebar-options">
                {options.map((option, index) => (
                    <label
                        key={index}
                        className={`sidebar-option ${selected === option ? "selected" : ""
                            }`}
                    // onClick={() => handleClick(option)}
                    >
                        <input
                            type="checkbox"
                            checked={selected.includes(option)}
                            onChange={() => handleClick(option)}
                            className="sidebar-checkbox"
                            onClick={(e) => e.stopPropagation()}

                        />
                        <span className="sidebar-option-text">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}
export default NutritionSideBar