import * as api from "../api"

export const getRecipes = () => async(dispatch) => {
    api.fetchRecipes()
    .then(({data})=>{
        
        dispatch({type:"FETCH_ALL", payload: data.recipes})
    })
    .catch(err => console.log(err.message))
}

export const postRecipe = (recipe) => async(dispatch) => {
    const formData = new FormData();
    if (recipe.name) formData.append("name", recipe.name);
    if (recipe.description) formData.append("description", recipe.description);
    if (recipe.instructions) formData.append("instructions", recipe.instructions);
    if (recipe.ingredients) formData.append("ingredients", JSON.stringify(recipe.ingredients));
    if (recipe.tags) formData.append("tags", JSON.stringify(recipe.tags));
    if (recipe.recipe_pic) formData.append("recipe_pic", recipe.recipe_pic);
    api.createRecipe(formData)
    .then(() => {
        return api.fetchRecipes()
    })
    .then(({data})=>{
        console.log(data)
        dispatch({type:"FETCH_ALL", payload: data.recipes})
    })
    .catch(err => console.log(err.message))
}

export const deleteRecipe = (recipeId) => async(dispatch) => {
    api.deleteRecipe(recipeId)
    .then(()=>{
        return api.fetchRecipes()
    })
    .then(({data})=>{
        dispatch({type:"DELETE", payload: data.recipes})
    })
    .catch(err => console.log(err.message))
}

export const patchRecipe = (recipeId, recipe) => async(dispatch) => {
    api.patchRecipe(recipeId, recipe)
    .then(()=>{
        return api.fetchRecipes()
    })
    .then(({data})=>{
        dispatch({type:"DELETE", payload: data.recipes})
    })
    .catch(err => console.log(err.message))
}