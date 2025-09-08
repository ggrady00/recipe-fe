import axios from 'axios'

const url = 'http://localhost:9090'

export const fetchRecipes = () => axios.get(`${url}/api/recipes`)
export const createRecipe = (newRecipe, token) => axios.post(`${url}/api/recipes`, newRecipe, token)
export const fetchRatings = () => axios.get(`${url}/api/ratings`)
export const postRegister = (newUser) => axios.post(`${url}/api/auth/register`, newUser)
export const postLogin = (userData) => axios.post(`${url}/api/auth/login`, userData)
export const fetchProfile = () => axios.get(`${url}/api/auth/profile`)
export const deleteRecipe = (recipeId) => axios.delete(`${url}/api/recipes/${recipeId}`)