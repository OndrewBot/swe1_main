import { React, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function RecipesNew(){
    
    const [inputFields, setInputFields] = useState([{ ingredient: '', amount: '', unit: '' }]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // const { ingredientChoices, setIngredientChoices } = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch('https://cs361-ingredients.onrender.com/ingredients', {
    //             method: 'GET'
    //         });
    //         const content = await response.json();
    //         const sorted_content = [...content].sort((a,b) => {return a.name.localeCompare(b.name);})
    //         setIngredientChoices(sorted_content);
    //     })();
    // }, []);

    let handleChange = (i, e) => {
        e.preventDefault();
        let newIngredient = [...inputFields];
        newIngredient[i][e.target.name] = e.target.value;
        setInputFields(newIngredient);
    }

    let addIngredient = () => {
        let addIngredient = {
            ingredient: '', amount: '', unit: ''
        };
        setInputFields([...inputFields, addIngredient]);
    }

    let deleteIngredient = (i) => {
        let data = [...inputFields];
        data.splice(i, 1);
        setInputFields(data);
    }

    const abandon = () => {
        navigate(-1)
    }

    const submit = async e => {
        e.preventDefault();

        const recipeData = {
            name,
            description,
            ingredients: inputFields
        };

        try {
            const response = await fetch('https://cs361-recipes.onrender.com/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            if (response.ok) {
                console.log('Recipe successfully created');
                navigate('/recipes');
            } else {
                console.error('Failed to create recipe:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating recipe:', error);
        }
        
        navigate(-1);
    }


    return (
        <>
            <div class="container px-4 py-5r">
                <div class="col-12 text-start">
                    <button type="submit" class="btn btn-dark" onClick={() => abandon()}>Abandon Changes</button>
                </div>
                <form class="row g-3" onSubmit={submit}>
                    <div class="col-md-6">
                        <label for="inputName" class="form-label">Recipe Name</label>
                        <input type="text" class="form-control" id="inputName" placeholder="Name" value={name}
                            onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div class="col-md-6">
                        <label for="inputDesc" class="form-label">Description</label>
                        <input type="text" class="form-control" id="inputDesc" placeholder="Short Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </div>

                {inputFields.map((input, index) => (
                    <div class="d-inline-flex gap-3" key={index}>
                        <div class="col-md-6">
                            <label for="ingredient" class="form-label">Ingredient</label>
                            <input type="text" class="form-control" name="ingredient" id="ingredient" value={input.ingredient || ""}
                            onChange={e => handleChange(index, e)} required/>
                        </div>
                        <div class="col-md-2">
                            <label for="amount" class="form-label">Amount</label>
                            <input type="numeric" class="form-control" name="amount" id="amount" value={input.amount}
                            onChange={e => handleChange(index, e)} required/>
                        </div>
                        <div class="col-md-2">
                            <label for="units" class="form-label">Units</label>
                            <select name="unit" id="inputUnit" class="form-select" value={input.unit}
                            onChange={e => handleChange(index, e)} required>
                                <option value="cups">cups</option>
                                <option value="grams">grams</option>
                                <option value="ounces">ounces</option>
                                <option value="packages">pkgs</option>
                            </select>
                        </div>
                        <div class="col-md-1 align-content-end">
                            <button type="button" class="btn btn-danger" onClick={() => deleteIngredient(index)}>Remove</button>
                        </div>
                    </div>
                ))}
                    <div class="align-content-center">
                        <button type="button" class="btn btn-primary" onClick={() => addIngredient()}>Add ingredient</button>
                    </div>
                    <div class="mb-5"></div>
                    <div class="col-12 text-end">
                        <button type="submit" class="btn btn-success">Finished with my Recipe</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RecipesNew;