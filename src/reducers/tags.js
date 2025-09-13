const reducer = (tags = [], action) => {
    switch(action.type) {
        case "FETCH_ALL_TAGS":
            return action.payload
        default:
            return tags
    }
}

export default reducer