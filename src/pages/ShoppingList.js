import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


function ShoppingList(){
    let navigate = useNavigate();
    const viewRecipes = () => {
        navigate('/recipes')
    }
    
    return (
        <>
        <h1 class="display-5">Shopping List</h1>
        <p class="lead">Use your ingredients and recipes to build a shopping list below</p>
        <p class="lead"></p>
        <div class="card d-inline-flex align-items-center" style={{width: 60 + '%'}}>
            <div class="card-body" style={{width: 90 + '%'}}>
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Ingredient</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Unit</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Sourdough bread</td>
                        <td>1</td>
                        <td>package</td>
                        <td>
                            <button class="btn btn-danger">Delete</button>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row mt-1 ms-2 me-3 text-start">
                <div class="input-group mb-3 col-10">
                    <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Choose...</option>
                        <option value="1">Peanut Butter</option>
                        <option value="2">Strawberry Jelly</option>
                        <option value="3">Cheddar Cheese</option>
                    </select>
                    <button class="btn btn-primary" type="button">Add Ingredient</button>
                    <button class="btn btn-outline-primary" type="button" onClick={()=>viewRecipes()}>Choose Recipes</button>
                    
                </div>
            </div>  
        </div>
        </>
    )
}

export default ShoppingList;