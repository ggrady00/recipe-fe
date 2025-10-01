const reducer = (comments = [], action) => {
    switch(action.type) {
        case "FETCH_COMMENTS_BY_ID":
            return action.payload
        default:
            return comments
    }
}

export default reducer