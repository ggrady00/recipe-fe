import { combineReducers } from "redux";
import recipes from "./recipes"
import ratings from "./ratings"


export const reducers = combineReducers({ recipes, ratings });