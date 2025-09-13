import { combineReducers } from "redux";
import recipes from "./recipes"
import ratings from "./ratings"
import user from "./user"
import ingredients from "./ingredients"
import tags from "./tags"


export const reducers = combineReducers({ recipes, ratings, user, ingredients, tags });