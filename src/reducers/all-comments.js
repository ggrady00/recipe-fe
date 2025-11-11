const reducer = (allComments = [], action) => {
    switch(action.type) {
        case "FETCH_ALL_COMMENTS":
            return action.payload
        default:
            return allComments
    }
}

export default reducer