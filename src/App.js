/** @jsxImportSource @emotion/react */
import React, {useEffect, useRef, useState} from "react";
import {Container, AppBar, Typography, Grow, Grid, Button, Toolbar} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'

import { getRecipes } from "./actions/recipes"
import { getRatings } from "./actions/ratings";
import { getSavedRecipes } from "./actions/saved-recipes";
import {getIngredients} from "./actions/ingredients"
import {getTags} from "./actions/tags"
import recipes from "./images/recipes.png"
import Form from "./components/Form/Form";
import Recipes from "./components/Recipes/Recipes"
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { appBar, heading, image, mainContainer, button, toolbar, centerToolbar, rightToolbar} from "./styles";
import Filter from "./components/Filter/Filter";
import UserProfile from "./components/User Profile/UserProfile";

const App = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const [currentForm, setCurrentForm] = useState('')
    const [previousForm, setPreviousForm] = useState("")
    const [previousProfileForm, setPreviousProfileForm] = useState("")
    const user = useSelector((state) => state.user)
    const [loggedIn, setLoggedIn] = useState(null)
    const [filterRecipesByUser, setFilterRecipesByUser] = useState(null)
    const [filteringRecipes, setFilteringRecipes] = useState(null)
    const [filterIngredients, setFilterIngredients] = useState([])
    const [filterTags, setFilterTags] = useState([])
    const [showSavedRecipes, setShowSavedRecipes] = useState(null)
    const prevUserRef = useRef(null)

    useEffect(()=>{
        dispatch(getRecipes())
        dispatch(getRatings())
        dispatch(getIngredients())
        dispatch(getTags())
    },[dispatch])

    useEffect(()=>{

        const prevUser = prevUserRef.current;
        

        if (!prevUser?.username && user?.username && !user.error) {
            setCurrentForm("")
            setLoggedIn(true)
            dispatch(getSavedRecipes())
        }

        if (prevUser?.username && !user?.username) {
            setCurrentForm("")
            setLoggedIn(false)
        }

        prevUserRef.current = user;
    },[user])


    const handleHome = () => {
        setFilterRecipesByUser(false)
        setCurrentForm("")
        setCurrentId(null)
        setFilteringRecipes(false)
        setShowSavedRecipes(false)
    }

    

    return (
    <Container maxWidth="lg">
        <AppBar css={appBar} position="static" color="inherit">
            <Toolbar css={toolbar} >
                <div>
                    <Button css={button} variant="contained" onClick={()=>{handleHome()}}>Home</Button>
                </div>
                <div css={centerToolbar}>
                    <Typography css={heading} variant="h2" align="center">Recipes</Typography>
                    <img css={image} src={recipes} alt="recipes" height="60" />
                </div>
                <div css={rightToolbar}>
                    {!loggedIn && <Button css={button} variant="contained" onClick={()=>setCurrentForm(prevForm => (prevForm === "register" ? "" : "register"))}>Register</Button>}
                    {!loggedIn && <Button css={button} variant="contained" onClick={()=>setCurrentForm(prevForm => (prevForm === "login" ? "" : "login"))}>Login</Button>}
                    {loggedIn && <Button css={button} variant="contained" onClick={()=>setCurrentForm(prevForm => (prevForm === "upload" ? "" : "upload"))}>Upload</Button>} 
                    {loggedIn && <Profile loggedInUser={user} setFilterRecipesByUser={setFilterRecipesByUser} setShowSavedRecipes={setShowSavedRecipes} setCurrentForm={setCurrentForm}/>} 
                    {/* add profile functionality */}
                </div>
            </Toolbar>
        </AppBar>
        
        {(currentForm !== "upload" && currentForm !== "edit" && currentForm !== "profile") && <Filter setFilteringRecipes={setFilteringRecipes} filteringRecipes={filteringRecipes} setFilterIngredients={setFilterIngredients} filterIngredients={filterIngredients} setFilterTags={setFilterTags} filterTags={filterTags}></Filter>}

        
        <Grow in>
            <Container>
                <Grid container css={mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={currentForm ? 8 : 12}>
                        {(currentForm !== "upload" && currentForm !== "edit" && currentForm !== "profile") && <Recipes setCurrentId={setCurrentId} currentId={currentId} filterRecipesByUser={filterRecipesByUser} setCurrentForm={setCurrentForm} filterIngredients={filterIngredients} filterTags={filterTags} showSavedRecipes={showSavedRecipes} previousForm={previousForm} setPreviousForm={setPreviousForm}/>}
                        {(currentForm === 'upload' || currentForm === "edit") && <Form currentForm={currentForm} currentId={currentId} setCurrentForm={setCurrentForm} setCurrentId={setCurrentId}/>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {currentForm === 'login' && <Login />}
                        {currentForm === 'register' && <Register />}
                    </Grid>
                </Grid>
                {(currentForm === "profile" && <UserProfile user={user} setCurrentForm={setCurrentForm} setCurrentId={setCurrentId} setPreviousForm={setPreviousForm} previousProfileForm={previousProfileForm} setPreviousProfileForm={setPreviousProfileForm}/>)}
            </Container>
        </Grow>
    </Container>
    )
}

export default App