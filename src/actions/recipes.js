import * as api from "../api"

export const getRecipes = () => async(dispatch) => {
    api.fetchRecipes()
    .then(({data})=>{
        dispatch({type:"FETCH_ALL", payload: data})
    })
    .catch(err => console.log(err.message))
}

export const postRecipe = (recipe, token) => async(dispatch) => {
    api.createRecipe(recipe, {
        headers: {
            "x-auth-token": token
        }
    })
    .then(({data}) => {
        dispatch({type: "CREATE", payload: data})
    })
    .catch(err => console.log(err.message))
}