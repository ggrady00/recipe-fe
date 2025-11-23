/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import Recipe from './Recipe/Recipe'
import { Grid2, CircularProgress, Dialog } from "@mui/material";
import { mainContainer } from "./styles";
import {Button} from "@mui/material";
import { getCommentsById } from "../../actions/comments";


const Recipes = ({setCurrentId, currentId, filterRecipesByUser, setCurrentForm, filterIngredients, filterTags, showSavedRecipes, previousForm, setPreviousForm, highlightMyComment, setHighlightMyComment}) => {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(currentId) {
            dispatch(getCommentsById(currentId))
        }
      },[currentId, dispatch])


    const recipes = useSelector((state)=>state.recipes)
    const user = useSelector((state) => state.user)
    const savedRecipes = useSelector((state) => state.savedRecipes)

    if(!recipes.length) return <CircularProgress />
    
    let filteredRecipes = filterRecipesByUser ? recipes.filter(recipe => recipe.created_by === user.username) : recipes
    const savedRecipeIds = savedRecipes.map(recipe => recipe.recipe_id)
    if(showSavedRecipes) {
        filteredRecipes = recipes.filter(recipe => savedRecipeIds.includes(recipe.id) )
        
    }
    
    if(filterIngredients.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            return filterIngredients.every(ing => {
               return recipe.ingredients.some(ri => ri.ingredient === ing.name)
            })
        })
    }
    if(filterTags.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            return filterTags.every(tag => {
               return recipe.tags.some(rt => rt === tag.name)
            })
        })
    }
    const showDelete = filterRecipesByUser ? true : false
    

    if(currentId) {
        const recipe = recipes.filter(recipe => recipe.id === currentId)[0]
        return (
            <Dialog fullScreen open={!!currentId} onClose={()=>setCurrentId(null)}>
                <Button
                        onClick={() => {
                            setCurrentId(null)
                            setHighlightMyComment(null)
                            if(previousForm) {
                                setCurrentForm(previousForm)
                                setPreviousForm("")
                            }
                            else setCurrentForm("")
                        }}
                        style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}
                    >
                        Close
                    </Button>
                <Recipe recipe={recipe} setCurrentId={setCurrentId} currentId={currentId} showDelete={showDelete} user={user} savedRecipes={savedRecipes} highlightMyComment={highlightMyComment}/>
            </Dialog>
            
        )
    }

    return (
            <Grid2 css={mainContainer} container alignItems="stretch" spacing={3} >
                {filteredRecipes.map(recipe => (
                    <Grid2 key={recipe.id} xs={12} sm={6}>
                        <Recipe recipe={recipe} setCurrentId={setCurrentId} currentId={currentId} showDelete={showDelete} setCurrentForm={setCurrentForm} user={user} savedRecipes={savedRecipes}/>
                    </Grid2>
                ))}
            </Grid2>
    )
}

export default Recipes