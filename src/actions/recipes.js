import * as api from "../api"

export const getRecipes = () => async(dispatch) => {
    api.fetchRecipes()
    .then(({data})=>{
        dispatch({type:"FETCH_ALL", payload: data})
    })
    .catch(err => console.log(err.message))
}