const reducer = (user = {}, action) => {
    switch(action.type) {
        case "POST_REGISTER":
            return action.payload
        case "POST_LOGIN":
            return action.payload
        default:
            return user
    }
}

export default reducer