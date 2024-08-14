import React from 'react';
import { useLocation } from 'react-router-dom';


function RecipesView(){

    const location = useLocation();
    const recipe = location.state || { name: '', description: '', ingredients: [] };
    console.log('Location State:', recipe);
    if (!recipe) {
        return <p>Loading...</p>;
    }
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