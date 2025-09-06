/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import {useSelector} from "react-redux"
import Recipe from './Recipe/Recipe'
import { Grid2, CircularProgress, Dialog } from "@mui/material";
import { mainContainer } from "./styles";
import {Button} from "@mui/material";


const Recipes = ({setCurrentId, currentId, filterRecipesByUser}) => {
    const recipes = useSelector((state)=>state.recipes)
    const user = useSelector((state) => state.user)

    if(!recipes.length) return <CircularProgress />
    
    const filteredRecipes = filterRecipesByUser ? recipes.filter(recipe => recipe.created_by == user.username) : recipes

    if(currentId) {
        const recipe = recipes.filter(recipe => recipe.id == currentId)[0]
        return (
            <Dialog fullScreen open={!!currentId} onClose={()=>setCurrentId(null)}>
                <Button
                        onClick={() => setCurrentId(null)}
                        style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}
                    >
                        Close
                    </Button>
                <Recipe recipe={recipe} setCurrentId={setCurrentId} currentId={currentId}/>
            </Dialog>
            
        )
    }

    return (
            <Grid2 css={mainContainer} container alignItems="stretch" spacing={3} >
                {filteredRecipes.map(recipe => (
                    <Grid2 key={recipe.id} xs={12} sm={6}>
                        <Recipe recipe={recipe} setCurrentId={setCurrentId} currentId={currentId}/>
                    </Grid2>
                ))}
            </Grid2>
    )
}

export default Recipes