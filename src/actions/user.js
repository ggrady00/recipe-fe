import * as api from "../api"
import axios from 'axios'

export const postRegister = (newUser) => async (dispatch) => {
    api.postRegister(newUser)
    .then(({data}) => {
        dispatch({type: "POST_REGISTER", payload: data.user})
        axios.defaults.headers.common["x-auth-token"] = data.token;
    })
    .catch((err) => {
        dispatch({type: "REGISTER_FAILURE", payload: err.response.data.msg})
    })
}


export const postLogin = (userData) => async (dispatch) => {
    api.postLogin(userData)
    .then(({data}) => {
        dispatch({type: "POST_LOGIN", payload: data.user})
        axios.defaults.headers.common["x-auth-token"] = data.token;
    })
    .catch(err => console.log(err.message))
}

export const getProfile = () => async (dispatch) => {
    api.fetchProfile()
    .then(({data}) => {
        dispatch({type: "FETCH_PROFILE", payload: data.profile})
    })
    .catch(err => console.log(err.message))
}

export const logout = () => async (dispatch) => {
    delete axios.defaults.headers.common["x-auth-token"]

    dispatch({type: "LOGOUT"})
}