import axios from 'axios'

const url = 'http://localhost:9090/api/recipes'

export const fetchRecipes = () => axios.get(url)
export const createRecipe = (newRecipe, token) => axios.post(url, newRecipe, token)
export const fetchRatings = () => axios.get("http://localhost:9090/api/ratings")
export const postRegister = (newUser) => axios.post("http://localhost:9090/api/auth/register", newUser)