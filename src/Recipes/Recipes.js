/** @jsxImportSource @emotion/react */
import React from "react";
import {useSelector} from "react-redux"
import Recipe from './Recipe/Recipe'
import { Grid2, CircularProgress } from "@mui/material";
import { mainContainer } from "./styles";


const Recipes = () => {
    const recipes = useSelector((state)=>state.recipes)
    console.log(recipes)

    return (
        !recipes.length ? <CircularProgress /> : (
            <Grid2 css={mainContainer} container alignItems="stretch" spacing={3} >
                {recipes.map(recipe => (
                    <Grid2 key={recipe.id} xs={12} sm={6}>
                        <Recipe recipe={recipe}/>
                    </Grid2>
                ))}
            </Grid2>
        )
    )
}

export default Recipes