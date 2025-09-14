import * as api from "../api"

export const getRecipes = () => async(dispatch) => {
    api.fetchRecipes()
    .then(({data})=>{
        
        dispatch({type:"FETCH_ALL", payload: data.recipes})
    })
    .catch(err => console.log(err.message))
}

export const postRecipe = (recipe) => async(dispatch) => {
    api.createRecipe(recipe)
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