import './NutritionSideBar.css';
import { useState } from 'react';

function NutritionSideBar({ options, onSelect }) {

    const [selected, setSelected] = useState(null);

    const handleClick = (option) => {
        setSelected(option)
        onSelect(option)
    }

    return (

        <div className="sidebar">
            <h3 className="sidebar-title">Nutrition Filters</h3>
            <div className="sidebar-options">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`sidebar-option ${selected === option ? "selected" : ""
                            }`}
                        onClick={() => handleClick(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default NutritionSideBar