import React from 'react';
import { Link } from 'react-router-dom';


function Home(){
    return (
        <div class="container px-4 py-5" id="featured-3">
            <h2 class="pb-2 border-bottom">Check out these Recipe Saver Features!</h2>
            <div class="row g-5 py-5 row-cols-1 row-cols-lg-2 d-inline-flex align-items-center justify-content-center">
                <div class="feature col">
                    <h3 class="fs-2 text-body-emphasis">1. Ingredients</h3>
                    <p>Here's where you can add new ingredients to save for later, use in a Recipe, or to add to your Shopping List.</p>
                    <Link to="/ingredients" class="icon-link">
                    Add an ingredient!
                    <svg class="bi"><use xlinkHref="#chevron-right"/></svg>
                    </Link>
                </div>
                <div class="feature col">
                    <h3 class="fs-2 text-body-emphasis">2. Recipes</h3>
                    <p>View your recipes here. You can create, edit, and delete them.</p>
                    <Link to="/recipes" class="icon-link">
                    Build a recipe!
                    <svg class="bi"><use xlinkHref="#chevron-right"/></svg>
                    </Link>
                </div>
                <div class="feature col">
                    <h3 class="fs-2 text-body-emphasis">3. Kitchen Timer</h3>
                    <p>Need a timer while that red wine sauce reduces or your brownies bake? You can build and control a custom timer here.</p>
                    <Link to="/timer" class="icon-link">
                    Start a timer!
                    <svg class="bi"><use xlinkHref="#chevron-right"/></svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;