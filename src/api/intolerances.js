// API utility for handling food intolerances with Spoonacular
// https://spoonacular.com/food-api/docs#Search-Recipes-Complex

const BASE = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = import.meta.env.VITE_SPOONACULAR_KEY;


/**
 * Fetches recipes with intolerance filtering
 * @param {Object} params - Search parameters
 * @param {string} params.query - Search query for ingredients/recipes
 * @param {string[]} params.intolerances - Array of intolerances (e.g., ['Dairy', 'Egg', 'Gluten'])
 * @param {string} params.includeIngredients - Comma-separated ingredients to include
 * @param {string} params.excludeIngredients - Comma-separated ingredients to exclude
 * @param {number} params.number - Number of results to return (default: 10)
 * @returns {Promise<Object>} - Recipe search results
 */




export async function fetchRecipesWithIntolerances({
    query = "",
    intolerances = [],
    includeIngredients = "",
    excludeIngredients = "",
    number = 10
}) {
    if (!apiKey) {
        throw new Error("Missing API key. Set VITE_SPOONACULAR_KEY in frontend/.env");
    }

    try {
        const params = new URLSearchParams();
        
        // Add basic search parameters
        if (query) params.set("query", query);
        if (includeIngredients) params.set("includeIngredients", includeIngredients);
        if (excludeIngredients) params.set("excludeIngredients", excludeIngredients);
        params.set("number", String(number));
        params.set("apiKey", apiKey);
        
        // Add intolerances parameter (comma-separated list)
        // Valid values: Dairy, Egg, Gluten, Grain, Peanut, Seafood, Sesame, Shellfish, Soy, Sulfite, Tree Nut, Wheat
        if (intolerances.length > 0) {
            params.set("intolerances", intolerances.join(","));
        }

        const url = `${BASE}?${params.toString()}`;
        const res = await fetch(url);

        if (!res.ok) {
            let hint = "";
            if (res.status === 401) hint = "Invalid API key";
            if (res.status === 402) hint = "Quota exceeded";
            const text = await res.text().catch(() => "");
            console.error("Spoonacular error", res.status, hint, text);
            throw new Error(`${res.status} ${hint}`);
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error fetching recipes with intolerances:", error);
        throw error;
    }
}

/**
 * Available intolerance options from Spoonacular API
 */
export const INTOLERANCE_OPTIONS = [
    "Dairy",
    "Egg",
    "Gluten",
    "Grain",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
    "Wheat"
];

/**
 * Validates if an intolerance string is valid
 * @param {string} intolerance - The intolerance to validate
 * @returns {boolean} - Whether the intolerance is valid
 */

export function isValidIntolerance(intolerance) {
    return INTOLERANCE_OPTIONS.includes(intolerance);
}




// How To Use The API Call for the Component:
/**
* 

import { fetchRecipesWithIntolerances, INTOLERANCE_OPTIONS } from '../api/intolerances';

// Example usage in a component:
const selectedIntolerances = ['Dairy', 'Gluten', 'Peanut'];

const results = await fetchRecipesWithIntolerances({
    query: "pasta",
    intolerances: selectedIntolerances,
    number: 10
});

// results will contain recipes that exclude ingredients with those intolerances


*/