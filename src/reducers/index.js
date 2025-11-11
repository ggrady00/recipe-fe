import { combineReducers } from "redux";
import recipes from "./recipes"
import ratings from "./ratings"
import user from "./user"
import ingredients from "./ingredients"
import tags from "./tags"
import comments from "./comments"
import savedRecipes from "./saved-recipes"
import allComments from "./all-comments"


export const reducers = combineReducers({ recipes, ratings, user, ingredients, tags, comments, savedRecipes, allComments });