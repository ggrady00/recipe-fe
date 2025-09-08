const reducer = (recipes = [], action) => {
    switch(action.type) {
        case "FETCH_ALL":
            return action.payload
        case "DELETE":
            return action.payload
        default:
            return recipes
    }
}

export default reducer