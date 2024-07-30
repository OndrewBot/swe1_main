import React from 'react';
import { NavLink, useNavigate, redirect } from 'react-router-dom';
import ShoppingList from './ShoppingList';

function Recipes(){
    let navigate = useNavigate();
    const goShopping = () =>{
        navigate('/shoppinglist');
    }
    return (
        <>
            <h1 class="display-5">Recipes</h1>
            <p class="lead">Pair ingredients with amounts to form a recipe.</p>
            <p class="lead">Here are recipes you've created!</p>
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Peanut Butter Jelly Sandwich
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            This is a classic. Couple of slices of white bread with pleanty of peanut butter and jelly dripping out the sides.
                            <div class="mt-2">
                                <NavLink to="/recipes/1234" className="btn btn-outline-primary">View Recipe</NavLink>
                                <button type="button" class="btn btn-primary col-md-2" onClick={() => goShopping()}>Add to Shopping List</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Peanut Butter Sandwich
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            This is a more boring take on the PB&J that some people just seem to like more. Couple of slices of white bread with pleanty of peanut butter and.... that's it?
                            <div class="mt-2">
                                    <NavLink to="/recipes/{id}" className="btn btn-outline-primary">View Recipe</NavLink>
                                    <button class="btn btn-primary col-md-2" onClick={() => goShopping()}>Add to Shopping List</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-2">
                <NavLink to="/addrecipes" className="btn btn-success">Add recipe</NavLink>
            </div>   
        </>
    );
}

export default Recipes;