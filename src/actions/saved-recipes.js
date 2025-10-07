import * as api from "../api"

export const getSavedRecipes = () => async(dispatch) => {
    api.fetchSavedRecipes()
    .then(({data})=>{
        // console.log(data)
        dispatch({type:"FETCH_SAVED_RECIPES", payload: data.savedRecipes})
    })
    .catch(err => console.log(err.message))
}