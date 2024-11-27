/** @jsxImportSource @emotion/react */
import React from "react";
import {useSelector} from "react-redux"
import Recipe from './Recipe/Recipe'
import ExpandedRecipe from "./ExpandedRecipe/ExpandedRecipe";
import { Grid2, CircularProgress } from "@mui/material";
import { mainContainer } from "./styles";


const Recipes = ({setCurrentId, currentId}) => {
    const recipes = useSelector((state)=>state.recipes)

    if(!recipes.length) return <CircularProgress />

    if(currentId) {
        console.log(currentId)
        const recipe = recipes.filter(recipe => recipe.id == currentId)[0]
        console.log(recipe)
        return <ExpandedRecipe recipe={recipe} setCurrentId={setCurrentId}/>
    }

    return (
            <Grid2 css={mainContainer} container alignItems="stretch" spacing={3} >
                {recipes.map(recipe => (
                    <Grid2 key={recipe.id} xs={12} sm={6}>
                        <Recipe recipe={recipe} setCurrentId={setCurrentId}/>
                    </Grid2>
                ))}
            </Grid2>
    )
}

export default Recipes