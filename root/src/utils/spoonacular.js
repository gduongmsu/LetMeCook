// URL helpers for Spoonacular

export function ingredientImgUrl(fileName, size = "100x100") {
    if (!fileName) return "";
    return `https://spoonacular.com/cdn/ingredients_${size}/${fileName}`;
}
