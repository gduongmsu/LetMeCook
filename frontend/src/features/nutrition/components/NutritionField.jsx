import './Nutritionfield.css'
import { useState } from 'react';

function NutritionField({ optionKey, option, onValueChange }) {

    const [value, setValue] = useState('');

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);


        if (onValueChange) {
            onValueChange(optionKey, newValue);
        }
    };

    return (
        <div className="nutrition-field">
            <label className='nutrition-label'>
                {option.label}
            </label>
            <input
                type="number"
                placeholder={`Enter a value (${(option.unit)})`}
                value={value}
                onChange={handleChange}
                className='nutrition-input'
            />
        </div>
    );

}

export default NutritionField

