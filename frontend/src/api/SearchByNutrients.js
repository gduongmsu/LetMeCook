
const BASE = "https://api.spoonacular.com/recipes/";
const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;

// parameter her is an object containing multiple key:value pairs like a dictionary
// e.g. {"minCarb": 10, "maxCarbs": 20}

//example:
//https://api.spoonacular.com/recipes/findByNutrients?apiKey=API_KEY&minCarbs=10&maxCarbs=500
export const searchRecipeByNutrients = async (nutritionParams) => { //async allows for 

    //start to build URL, firstly storing {"apiKey": APIK_KEY}
    //use .toString later to conver to usable URL
    const queryParams = new URLSearchParams();

    queryParams.append("apiKey", API_KEY);

    for (const [key, value] of Object.entries(nutritionParams)) {
        if (value !== "" && value != null) { //use !== for compaing different types
            queryParams.append(key, value);
        }

    }

    const url = `${BASE}findByNutrients?${queryParams.toString()}`;



    console.log("fetching uurl:", url)
    try {
        const response = await fetch(url); //fetch starts http request and returns to response object, await pauses this function until something is returned to response
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return await response.json()
    } catch (err) {
        console.error("Error fetching recipe", err);
        throw err; //throw error to parent component 
    }

}

//https://api.spoonacular.com/recipes/636574/information?apiKey=API_KEY&includeNutrition=true
export const getRecipeById = async (id) => {
    const res = await fetch(
        `${BASE}${id}/information?apiKey=${API_KEY}&includeNutrition=true`
    )
    return res.json();
}


