const reducer = (shoppingList = [], action) => {
    switch(action.type) {
        case "FETCH_SHOPPING_LIST":
            return action.payload
        default:
            return shoppingList
    }
}

export default reducer