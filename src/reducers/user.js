const reducer = (user = {}, action) => {
    switch(action.type) {
        case "POST_REGISTER":
            return action.payload
        case "POST_LOGIN":
            return action.payload
        case "FETCH_PROFILE":
            return action.payload
        case "LOGOUT":
            return {}
        case "REGISTER_FAILURE":
            return {...user, error: action.payload}
        case "PATCH_PROFILE_FAILURE":
            return {...user, error: action.payload}
        case "CLEAR_USER_ERROR":
            return {...user, error: null}
        default:
            return user
    }
}

export default reducer