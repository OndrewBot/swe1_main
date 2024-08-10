import { React, useState } from 'react';
import { NavLink, Link, Navigate } from 'react-router-dom';
import IngredientsAdd from '../pages/IngredientsAdd';


function Ingredients(){
    const [ingredient, setIngredient] = useState('');

    const addIngredient = async e => {
        e.preventDefault();

        await fetch('redis://red-cqra9k56l47c73ebbuv0:6379', {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
                ingredient
            })
        });

        Navigate(-1);
    }

    return (
        <>
        <h1 class="display-5">Ingredients</h1>
        <p class="lead">Add your favorite ingredients here.</p>
        <p class="lead">Use them to build a recipe!</p>
        <div class="card d-inline-flex align-items-center" style={{width: 60 + '%'}}>
            <div class="col-11 mt-1 ms-2 me-3 text-start">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Enter new ingredient" 
                    onChange={e => setIngredient(e.target.value)}/>
                    <button class="btn btn-primary" type="button" onClick={() => addIngredient()}>Add</button>
                </div>
                
            </div>  
            <div class="card-body" style={{width: 90 + '%'}}>
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Ingredient</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Sourdough bread</td>
                        <td>
                            <button class="btn btn-danger">Delete</button>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default Ingredients;