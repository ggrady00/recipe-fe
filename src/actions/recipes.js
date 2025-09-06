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