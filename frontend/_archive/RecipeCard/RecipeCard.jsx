import React from 'react'
import IngredientList from '../IngredientList/IngredientList'
import Nutrition from '../Nutrition/Nutrition'
import './RecipeCard.css'
import burgerPic from '../Assets/burger.jpg'

const RecipeCard = () => {
  return (
    <div className='card'>
        <div className='nameHeader'>
            <div className='titleText'>Classic Hamburger</div>
            <div className='summary'>American classic with tomato, lettuce, cheese, patty</div>
            <img className='preview' src={burgerPic}></img>
        </div>
    
        <div className='ingredientsNutrition'>
            <IngredientList />
            <Nutrition />
        </div>
    </div>
  )
}

export default RecipeCard
