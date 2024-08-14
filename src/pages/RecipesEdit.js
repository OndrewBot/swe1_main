import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function RecipesEdit() {
    const location = useLocation();
    const id = location.state;
    const [recipe, setRecipe] = useState({ name: '', description: '', ingredients: [] });
    const [ingredientChoices, setIngredientChoices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the current recipe data
        (async () => {
            try {
                const response = await fetch(`https://cs361-recipes.onrender.com/recipes/${id}`, {
                    method: 'GET'
                });
                if (response.ok) {
                    const content = await response.json();
                    setRecipe(content);
                } else {
                    console.error('Failed to fetch recipe:', response.status);
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        })();

        // Fetch the ingredient choices
        (async () => {
            try {
                const response = await fetch('https://cs361-ingredients.onrender.com/ingredients', {
                    method: 'GET'
                });
                if (response.ok) {
                    const content = await response.json();
                    const sorted_content = [...content].sort((a, b) => a.name.localeCompare(b.name));
                    setIngredientChoices(sorted_content);
                } else {
                    console.error('Failed to fetch ingredients:', response.status);
                }
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        })();
    }, [id]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index][name] = value;
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { ingredient: '', amount: '', unit: '' }] });
    };

    const deleteIngredient = (index) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients.splice(index, 1);
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };

    const submit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://cs361-recipes.onrender.com/recipes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe),
            });

            const data = await response.json();

            if (data.id) {
                navigate(`/recipes/${data.id}`);
            } else {
                console.error("Failed to retrieve recipe ID:", data);
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    const abandon = () => {
        navigate(-1);
    };

    return (
        <div className="container px-4 py-5">
            <div className="col-12 text-start">
                <button type="button" className="btn btn-dark" onClick={abandon}>Abandon Changes</button>
            </div>
            <form className="row g-3" onSubmit={submit}>
                <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">Recipe Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        value={recipe.name}
                        onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputDesc" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputDesc"
                        value={recipe.description}
                        onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
                        required
                    />
                </div>

                {recipe.ingredients.map((input, index) => (
                    <div className="d-inline-flex gap-3" key={index}>
                        <div className="col-md-6">
                            <label htmlFor={`ingredient${index}`} className="form-label">Ingredient</label>
                            <select
                                className="form-select"
                                name="ingredient"
                                id={`ingredient${index}`}
                                value={input.ingredient}
                                onChange={(e) => handleChange(index, e)}
                                required
                            >
                                {ingredientChoices.map(choice => (
                                    <option key={choice.name} value={choice.name}>{choice.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor={`amount${index}`} className="form-label">Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                name="amount"
                                id={`amount${index}`}
                                value={input.amount}
                                onChange={(e) => handleChange(index, e)}
                                required
                            />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor={`unit${index}`} className="form-label">Units</label>
                            <select
                                name="unit"
                                id={`unit${index}`}
                                className="form-select"
                                value={input.unit}
                                onChange={(e) => handleChange(index, e)}
                                required
                            >
                                <option value="cups">cups</option>
                                <option value="grams">grams</option>
                                <option value="ounces">ounces</option>
                                <option value="packages">pkgs</option>
                            </select>
                        </div>
                        <div className="col-md-1 align-content-end">
                            <button type="button" className="btn btn-danger" onClick={() => deleteIngredient(index)}>Remove</button>
                        </div>
                    </div>
                ))}
                <div className="align-content-center">
                    <button type="button" className="btn btn-primary" onClick={addIngredient}>Add ingredient</button>
                </div>
                <div className="mb-5"></div>
                <div className="col-12 text-end">
                    <button type="submit" className="btn btn-success">Update Recipe</button>
                </div>
            </form>
        </div>
    );
}

export default RecipesEdit;
