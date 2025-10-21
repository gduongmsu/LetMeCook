import React from 'react'
import './IngredientList.css'
import Directions from '../Directions/Directions'

const IngredientList = () => {
  return (
    <div className='ingredients'>
        Bun <br/>
        Lettuce <br/>
        Tomato <br/>
        Cheese <br/>
        Patty <br/>
        <div>
            <Directions/>
        </div>
    </div>
  )
}

export default IngredientList
