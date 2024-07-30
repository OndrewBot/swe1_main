import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navigation(){
    return (
        <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <svg class="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"/></svg>
            <span class="fs-4">Recipe Saver</span>
          </a>
          <ul class="nav nav-pills">
            <li class="nav-item"><NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Home</NavLink></li>
            <li class="nav-item"><NavLink to="/ingredients" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Ingredients</NavLink></li>
            <li class="nav-item"><NavLink to="/recipes" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Recipes</NavLink></li>
            <li class="nav-item"><NavLink to="/shoppinglist" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Shopping List</NavLink></li>
            <li class="nav-item"><NavLink to="/timer" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Kitchen Timer</NavLink></li>
            <li class="nav-item"><NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>About</NavLink></li>
          </ul>
        </header>
      </div>
    )
}

export default Navigation;