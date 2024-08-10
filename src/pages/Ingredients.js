import { React, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import IngredientsAdd from '../pages/IngredientsAdd';


function Ingredients(){
    const [name, setName] = useState('');
    let navigate = useNavigate();
    const addIngredient = async () => {
        await fetch('https://cs361-ingredients.onrender.com/ingredients', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"name": name})
        });

        navigate("/");
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
                    onChange={e => setName(e.target.value)} value={name}/>
                    <button class="btn btn-primary" type="button" onClick={()=>addIngredient()}>Add</button>
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