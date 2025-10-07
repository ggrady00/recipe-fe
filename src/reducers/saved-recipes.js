const reducer = (savedRecipes = [], action) => {
    switch(action.type) {
        case "FETCH_SAVED_RECIPES":
            return action.payload
        default:
            return savedRecipes
    }
}

export default reducer