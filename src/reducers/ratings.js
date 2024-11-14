const reducer = (ratings = [], action) => {
    switch(action.type) {
        case "FETCH_ALL_RATINGS":
            return action.payload
        default:
            return ratings
    }
}

export default reducer