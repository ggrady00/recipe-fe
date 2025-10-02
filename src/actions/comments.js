import * as api from "../api"

export const getCommentsById = (recipeId) => async(dispatch) => {
    api.getCommentsById(recipeId)
    .then(({data})=>{
        
        dispatch({type:"FETCH_COMMENTS_BY_ID", payload: data.comments})
    })
    .catch(err => console.log(err.message))
}

export const postCommentsById = (recipeId, comment) => async(dispatch) => {
    api.postCommentById(recipeId, comment)
    .then(()=>{
        return api.getCommentsById(recipeId)
    })
    .then(({data})=>{
        
        dispatch({type:"FETCH_COMMENTS_BY_ID", payload: data.comments})
    })
    .catch(err => console.log(err.message))
}