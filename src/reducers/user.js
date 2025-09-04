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
        default:
            return user
    }
}

export default reducer