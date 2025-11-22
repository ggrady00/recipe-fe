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

export const patchProfile = (profile) => async(dispatch) => {
    const formData = new FormData();

    if (profile.username) formData.append("username", profile.username);
    if (profile.profile_info) formData.append("profile_info", profile.profile_info);
    if (profile.profile_pic) formData.append("profile_pic", profile.profile_pic);
    return api.patchProfile(formData)
    .then(()=>{
        return api.fetchProfile()
    })
    .then(({data}) => {
        dispatch({type: "FETCH_PROFILE", payload: data.profile})
        return true;
    })
    .catch(err => {
        dispatch({type: "PATCH_PROFILE_FAILURE", payload: err.response.data.msg})
        return false;
    })
}

export const clearUserError = () => async(dispatch) => {
    dispatch({type: "CLEAR_USER_ERROR"})
}