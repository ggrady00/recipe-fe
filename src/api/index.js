import axios from 'axios'

const url = 'http://localhost:9090/api/recipes'

export const fetchRecipes = () => axios.get(url)