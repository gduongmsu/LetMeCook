import './Nutritionfield.css'
import { useState } from 'react';

function NutritionField({ option, onValueChange }) {

    const [value, setValue] = useState('');

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);


        if (onValueChange) {
            onValueChange(option, newValue);
        }
    };

    return (
        <div className="nutrition-field">
            <label className='nutrition-label'>{option}</label>
            <input
                type="number"
                placeholder={`Enter ${option}`}
                value={value}
                onChange={handleChange}
                className='nutrition-input'
            />
        </div>
    );

}

export default NutritionField
