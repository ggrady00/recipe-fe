import * as api from "../api"

export const getTags = () => async(dispatch) => {
    api.fetchTags()
    .then(({data})=>{
        
        dispatch({type:"FETCH_ALL_TAGS", payload: data.tags})
    })
    .catch(err => console.log(err.message))
}

export const postTags = (newTag) => async(dispatch) => {
    api.postTags(newTag)
    .then(({data}) => {
        return api.fetchTags()
    })
    .then(({data}) => {
        dispatch({type:"FETCH_ALL_TAGS", payload: data.tags})
    })
    .catch(err => console.log(err.message))
}