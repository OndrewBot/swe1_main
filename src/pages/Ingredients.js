import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IngredientsAdd from '../pages/IngredientsAdd';


function Ingredients(){

    const [ingredients, setIngredients] = useState([]);
    // const [newIngredient, setNewIngredient] = useState('');
    const [bulkIngredient, setBulkIngredient] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await fetch('https://cs361-ingredients.onrender.com/ingredients', {
                method: 'GET'
            });
            const content = await response.json();
            const sorted_content = [...content].sort((a,b) => {return a.name.localeCompare(b.name);})
            setIngredients(sorted_content);
        })();
    }, []);

    const addIngredient = async () => {

        const bulkString = encodeURIComponent(bulkIngredient.toUpperCase());

        const parserResponse = await fetch(`https://string-parser-3.onrender.com/ingredients?ingredients=${bulkString}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const parserData = await parserResponse.json();
        const ingredientValues = Object.values(parserData);

        for (const newIngredient of ingredientValues) {
            const response = await fetch('https://cs361-ingredients.onrender.com/ingredients', {
                method: 'POST', headers: {'Content-Type': 'application/json' }, body: JSON.stringify({name: newIngredient})
            });
            if (response.ok) {
                ;
            } else {
                console.error(`Failed to add ingredient "{ingredient}": `, response.status);
            }
        }
        navigate(0);
    }

    const del = async id => {
        if (window.confirm("Are you sure you want to delete this ingredient?")) {
            await fetch(`https://cs361-ingredients.onrender.com/ingredients/${id}`, {
                method: 'DELETE'
            });

            setIngredients(ingredients.filter(i => i.id !== id));
        }
    }

    return (
        <>
        <h1 class="display-5">Ingredients</h1>
        <p class="lead">Add your favorite ingredients here.</p>
        <p class="lead">You can add more than one at a time. Separate them by a comma.</p>
        <div class="card d-inline-flex align-items-center" style={{width: 60 + '%'}}>
            <div class="col-11 mt-1 ms-2 me-3 text-start">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Ex: apple, salt, steak" 
                    onChange={e => setBulkIngredient(e.target.value)} value={bulkIngredient}/>
                    <button class="btn btn-primary" type="button" onClick={addIngredient}>Add</button>
                </div>
                
            </div>  
            <div class="card-body" style={{width: 90 + '%'}}>
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Ingredient</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {ingredients.map(ingredient => {
                        return <tr scope="row" key={ingredient.id}>
                            <td>{ingredient.name}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" onClick={e => del(ingredient.id)}>Delete</button>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default Ingredients;