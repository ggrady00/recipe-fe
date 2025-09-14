/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from "react";
import {Container, AppBar, Typography, Grow, Grid, Button, Toolbar} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'

import { getRecipes } from "./actions/recipes"
import { getRatings } from "./actions/ratings";
import {getIngredients} from "./actions/ingredients"
import {getTags} from "./actions/tags"
import recipes from "./images/recipes.png"
import Form from "./components/Form/Form";
import Recipes from "./components/Recipes/Recipes"
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { appBar, heading, image, mainContainer, button, toolbar, centerToolbar, rightToolbar} from "./styles";

const App = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const [currentForm, setCurrentForm] = useState('')
    const user = useSelector((state) => state.user)
    const [loggedIn, setLoggedIn] = useState(null)
    const [filterRecipesByUser, setFilterRecipesByUser] = useState(null)

    useEffect(()=>{
        dispatch(getRecipes())
        dispatch(getRatings())
        dispatch(getIngredients())
        dispatch(getTags())
    },[dispatch])

    useEffect(()=>{
        if (Object.keys(user).length) {
            setCurrentForm("")
            setLoggedIn(true)
        }

        if (!Object.keys(user).length) {
            setCurrentForm("")
            setLoggedIn(false)
        }
    },[user])

    const handleHome = () => {
        setFilterRecipesByUser(false)
        setCurrentForm("")
        setCurrentId(null)
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
                    {!loggedIn && <Button css={button} variant="contained" onClick={()=>setCurrentForm("register")}>Register</Button>}
                    {!loggedIn && <Button css={button} variant="contained" onClick={()=>setCurrentForm("login")}>Login</Button>}
                    {loggedIn && <Button css={button} variant="contained" onClick={()=>setCurrentForm(prevForm => (prevForm === "upload" ? "" : "upload"))}>Upload</Button>} 
                    {loggedIn && <Profile loggedInUser={user} setFilterRecipesByUser={setFilterRecipesByUser}/>} 
                    {/* add profile functionality */}
                </div>
            </Toolbar>
        </AppBar>
        <Grow in>
            <Container>
                <Grid container css={mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={currentForm ? 8 : 12}>
                        {(currentForm !== "upload" && currentForm !== "edit") && <Recipes setCurrentId={setCurrentId} currentId={currentId} filterRecipesByUser={filterRecipesByUser} setCurrentForm={setCurrentForm}/>}
                        {(currentForm === 'upload' || currentForm === "edit") && <Form currentForm={currentForm} currentId={currentId} setCurrentForm={setCurrentForm} setCurrentId={setCurrentId}/>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {currentForm === 'login' && <Login />}
                        {currentForm === 'register' && <Register />}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    </Container>
    )
}

export default App