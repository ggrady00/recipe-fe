import * as api from "../api"

export const getIngredients = () => async(dispatch) => {
    api.fetchIngredients()
    .then(({data})=>{
        dispatch({type:"FETCH_ALL_INGREDIENTS", payload: data.ingredients})
    })
    .catch(err => console.log(err.message))
}

export const postIngredients = (newIng) => async(dispatch) => {
    api.postIngredients(newIng)
    .then(()=>{
        return api.fetchIngredients()
    })
    .then(({data})=>{
        dispatch({type:"FETCH_ALL_INGREDIENTS", payload: data.ingredients})
    })
    .catch(err => console.log(err.message))
}