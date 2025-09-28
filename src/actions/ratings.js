import * as api from "../api"

export const getRatings = () => async(dispatch) => {
    api.fetchRatings()
    .then(({data})=>{
        dispatch({type:"FETCH_ALL_RATINGS", payload: data.ratings})
    })
    .catch(err => console.log(err.message))
}

export const createRating = (recipeId, rating) => async(dispatch) => {
    api.postRating(recipeId, rating)
    .then(() => {
        return api.fetchRatings()
    })
    .then(({data}) => {
        dispatch({type:"FETCH_ALL_RATINGS", payload: data.ratings})
    })
    .catch(err => console.log(err.message))
}