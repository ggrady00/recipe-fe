import axios from 'axios'

const url = 'http://localhost:9090'

export const fetchRecipes = () => axios.get(`${url}/api/recipes`)
export const createRecipe = (newRecipe, token) => axios.post(`${url}/api/recipes`, newRecipe, token)
export const fetchRatings = () => axios.get(`${url}/api/ratings`)
export const postRegister = (newUser) => axios.post(`${url}/api/auth/register`, newUser)
export const postLogin = (userData) => axios.post(`${url}/api/auth/login`, userData)
export const fetchProfile = () => axios.get(`${url}/api/auth/profile`)
export const deleteRecipe = (recipeId) => axios.delete(`${url}/api/recipes/${recipeId}`)
export const fetchIngredients = () => axios.get(`${url}/api/ingredients`)
export const postIngredients = (newIng) => axios.post(`${url}/api/ingredients`, newIng)
export const fetchTags = () => axios.get(`${url}/api/tags`)
export const postTags = (newTag) => axios.post(`${url}/api/tags`, newTag)
export const patchRecipe = (recipeId, recipe) => axios.patch(`${url}/api/recipes/${recipeId}`, recipe)