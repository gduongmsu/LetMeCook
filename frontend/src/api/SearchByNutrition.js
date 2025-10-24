
const BASE = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;


export const searchRecipeByNutrition = async (nutritionParams) => {

    const queryParams = new URLSearchParams(); //start api query

    queryParams.append('apiKey', API_KEY)
}

// need to pass data from nutrition components, call api based on this data
// then grab data (recipes) from spoonacular and display in another component