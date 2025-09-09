import * as api from "../api"

export const getIngredients = () => async(dispatch) => {
    api.fetchIngredients()
    .then(({data})=>{
        dispatch({type:"FETCH_ALL_INGREDIENTS", payload: data.ingredients})
    })
    .catch(err => console.log(err.message))
}