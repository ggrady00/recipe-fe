const reducer = (ingredients = [], action) => {
    switch(action.type) {
        case "FETCH_ALL_INGREDIENTS":
            return action.payload
        default:
            return ingredients
    }
}

export default reducer