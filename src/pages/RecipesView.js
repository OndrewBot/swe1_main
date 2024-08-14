import {React, useState} from 'react';
import { useLocation } from 'react-router-dom';


function RecipesView(){
    const {recipe, setRecipe} = useState(null);
    const location = useLocation();
    const id = location.state;
    
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`https://cs361-recipes.onrender.com/recipes/${id}`, {
                    method: 'GET'
                });
                if (response.ok) {
                    const content = await response.json();
                    const sorted_ingredients = [...content.ingredients].sort((a, b) => a.ingredient.localeCompare(b.ingredient));
                    setRecipe({...content, ingredients: sorted_ingredients});
                } else {
                    console.error('Failed to fetch recipes:', response.status);
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        })();
    }, []);

    return (
        <>
            <h1 class="display-5">{recipe.name}</h1>
            <p class="lead">{recipe.description}</p>
            <div class="card d-inline-flex align-items-center" style={{width: 60 + '%'}}>
                <div class="col-11 mt-1 ms-2 me-3 text-start">
                    <div class="input-group mb-3">
                        <button class="btn btn-primary" type="button">Edit</button>
                    </div>
                    
                </div>  
                <div class="card-body" style={{width: 90 + '%'}}>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Ingredients</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipe.ingredients.map((item, index) => {
                                return <tr scope="row" key={index}>
                                    <td>{item.amount} {item.unit} of {item.ingredient}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default RecipesView;