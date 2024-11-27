import * as api from "../api"

export const postRegister = (newUser) => async (dispatch) => {
    api.postRegister(newUser)
    .then(({data}) => {
        dispatch({type: "POST_REGISTER", payload: data})
    })
    .catch(err => console.log(err.message))
}

