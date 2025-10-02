import {useEffect, useState} from "react"

const url = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = "a23c1b544e2240b79dfb64cce259d43b";

export default function Search(){
    const[query, setQuery] = useState("pizza");
    const[resp, setResponse] = useState();

    useEffect( () => {
        async function fecthFood() {
            const response = await fetch(`${URL}?query=${query}&apiKey=${apiKey}`);
            const data = await response.json();
            setResponse(data);
            console.log("Fetchfood Called!");
            console.log(data);
            }
        fecthFood();
        }, [query])
    
    return (
        <div className="SearchReturn">
            <p>{resp}</p>
        </div>
    )
}