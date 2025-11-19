import * as api from "../api"

export const getShoppingList = () => async(dispatch) => {
    api.fetchShoppingList()
    .then(({data})=>{
        dispatch({type:"FETCH_SHOPPING_LIST", payload: data.shoppingList})
    })
    .catch(err => console.log(err.message))
}

export const postShoppingList = (ings) => async(dispatch) => {
    api.postShoppingList(ings)
    .then(()=>{
        return api.fetchShoppingList()
    })
    .then(({data})=>{
        dispatch({type:"FETCH_SHOPPING_LIST", payload: data.shoppingList})
    })
    .catch(err => console.log(err.message))
}

export const deleteShoppingListItem = (id) => async(dispatch) => {
    api.deleteShoppingListItem(id)
    .then(()=>{
        return api.fetchShoppingList()
    })
    .then(({data})=>{
        dispatch({type:"FETCH_SHOPPING_LIST", payload: data.shoppingList})
    })
    .catch(err => console.log(err.message))
}

export const patchShoppingListItems = (id, quantity) => async(dispatch) => {
    api.patchShoppingListItems(id, quantity)
    .then(()=>{
        return api.fetchShoppingList()
    })
    .then(({data})=>{
        dispatch({type:"FETCH_SHOPPING_LIST", payload: data.shoppingList})
    })
    .catch(err => console.log(err.message))
}