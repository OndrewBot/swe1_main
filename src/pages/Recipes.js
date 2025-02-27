import { React, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


function Recipes(){
    const [ recipes, setRecipes ] = useState([])

    let navigate = useNavigate();
    const goShopping = () =>{
        navigate('/shoppinglist');
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://cs361-recipes.onrender.com/recipes', {
                    method: 'GET'
                });
                if (response.ok) {
                    const content = await response.json();
                    const sorted_content = [...content].sort((a, b) => a.name.localeCompare(b.name));
                    setRecipes(sorted_content);
                } else {
                    console.error('Failed to fetch recipes:', response.status);
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        })();
    }, []);

    const viewRecipe = (id) => {
        navigate(`/recipes/${id}`, { state: id });
    }

    return (
        <>
            <h1 class="display-5">Recipes</h1>
            <p class="lead">Pair ingredients with amounts to form a recipe.</p>
            <p class="lead">Here are recipes you've created!</p>
            <div class="accordion" id="accordionExample">
                {recipes.map(recipe => {
                    return <div class="accordion-item" key={recipe.id}>
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${recipe.id}`} aria-expanded="false" aria-controls={`collapse${recipe.id}`}>
                                {recipe.name}
                            </button>
                        </h2>
                        <div id={`collapse${recipe.id}`} class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                {recipe.description}
                                <div class="mt-2">
                                    <button type="button" class="btn btn-primary col-md-2" onClick={() => viewRecipe(recipe.id)}>View Recipe</button>
                                    {/* <button type="button" class="btn btn-primary col-md-2" onClick={() => goShopping()}>Add to Shopping List</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
            <div class="mt-2">
                <NavLink to="/recipes/new" className="btn btn-success">Add recipe</NavLink>
            </div>   
        </>
    );
}

export default Recipes;