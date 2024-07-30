import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import Navigation from './components/Navigation.js';
import Home from './pages/Home.js';
import Recipes from './pages/Recipes';
import RecipesNew from './pages/RecipesNew';
import RecipesEdit from './pages/RecipesEdit.js';
import RecipesNewAddItem from './pages/RecipesNewAddItem';
import RecipesView from './pages/RecipesView';
import ShoppingList from './pages/ShoppingList';
import ShoppingListAddRecipe from './pages/ShoppingListAddRecipe';
import ShoppingListAddIngredient from './pages/ShoppingListAddIngredient';
import Ingredients from './pages/Ingredients';
import IngredientsAdd from './pages/IngredientsAdd';
import KitchenTimer from './pages/KitchenTimer';
import About from './pages/About';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/recipes" element={<Recipes />}/>
            <Route path="/addrecipes" element={<RecipesNew />}/>
            <Route path="/recipes" element={<RecipesEdit />}/>
            <Route path="/recipes" element={<RecipesNewAddItem />}/>
            <Route path="/recipes" element={<RecipesView />}/>
            <Route path="/shoppinglist" element={<ShoppingList />}/>
            <Route path="/ingredients" element={<Ingredients />}/>
            <Route path="/ingredients" element={<IngredientsAdd />}/>
            <Route path="/timer" element={<KitchenTimer />}/>
            <Route path="/about" element={<About />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
