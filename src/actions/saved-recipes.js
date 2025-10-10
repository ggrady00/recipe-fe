import * as api from "../api"

export const getSavedRecipes = () => async(dispatch) => {
    api.fetchSavedRecipes()
    .then(({data})=>{
        dispatch({type:"FETCH_SAVED_RECIPES", payload: data.savedRecipes})
    })
    .catch(err => console.log(err.message))
}

export const postSavedRecipes = (recipeId) => async(dispatch) => {
    api.postSavedRecipes(recipeId)
    .then(() => {
        return api.fetchSavedRecipes()
    })
    .then(({data})=>{
        dispatch({type:"FETCH_SAVED_RECIPES", payload: data.savedRecipes})
    })
    .catch(err => console.log(err.message))
}

export const deleteSavedRecipes = (recipeId) => async(dispatch) => {
    console.log(recipeId)
    api.deleteSavedRecipes(recipeId)
    .then(() => {
        return api.fetchSavedRecipes()
    })
    .then(({data})=>{
        dispatch({type:"FETCH_SAVED_RECIPES", payload: data.savedRecipes})
    })
    .catch(err => console.log(err.message))
}