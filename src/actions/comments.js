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

export const deleteCommentById = (commentId, recipeId) => async(dispatch) => {
    api.deleteCommentById(commentId)
    .then(()=>{
        return api.getCommentsById(recipeId)
    })
    .then(({data})=>{
        
        dispatch({type:"FETCH_COMMENTS_BY_ID", payload: data.comments})
    })
    .then(()=>{
        return api.fetchComments()
    })
    .then(({data}) => {
        dispatch({type:"FETCH_ALL_COMMENTS", payload: data.comments})
    })
    .catch(err => console.log(err.message))
}

export const getComments = () => async(dispatch) => {
    api.fetchComments()
    .then(({data}) => {
        dispatch({type:"FETCH_ALL_COMMENTS", payload: data.comments})
    })
    .catch(err => console.log(err.message))
}