import { combineReducers } from "redux";
import recipes from "./recipes"
import ratings from "./ratings"
import user from "./user"


export const reducers = combineReducers({ recipes, ratings, user });