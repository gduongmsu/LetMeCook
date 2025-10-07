import {useEffect, useState} from "react"

const url = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = "a23c1b544e2240b79dfb64cce259d43b";

export default function Search({include, handleDataFromSearch}){
    // const[query, setQuery] = useState("pizza");
    const[resp, setResponse] = useState();

    useEffect( () => {
        async function fecthFood() {
            console.log("Query is " + include);
            const response = await fetch(`${url}?query=${include}&apiKey=${apiKey}`);
            const data = await response.json();
            setResponse(data);
            const dataString = JSON.stringify(data, null, 2);
            handleDataFromSearch(dataString)
            console.log("Fetchfood Called!");
            console.log(data);
            }
        fecthFood();
        }, [include])
    
    return (
        <div className="SearchReturn">
            <pre>{JSON.stringify(resp, null, 2)}</pre>
            <p>Hey Can You See This?</p>
        </div>
    )
}