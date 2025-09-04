/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from "react";
import {Container, AppBar, Typography, Grow, Grid, Button, Toolbar} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'

import { getRecipes } from "./actions/recipes"
import { getRatings } from "./actions/ratings";
import { getProfile } from "./actions/user";
import recipes from "./images/recipes.png"
import Form from "./Form/Form";
import Recipes from "./Recipes/Recipes"
import Register from "./Register/Register";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import { appBar, heading, image, mainContainer, button, toolbar, centerToolbar} from "./styles";

const App = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const [currentForm, setCurrentForm] = useState('')
    const user = useSelector((state) => state.user)
    const [loggedIn, setLoggedIn] = useState(null)

    useEffect(()=>{
        dispatch(getRecipes())
        dispatch(getRatings())
        dispatch(getProfile())
    },[dispatch])

    useEffect(()=>{
        if (Object.keys(user).length) {
            setCurrentForm("upload")
            setLoggedIn(true)
        }
    },[user])

    return (
    <Container maxWidth="lg">
        <AppBar css={appBar} position="static" color="inherit">
            <Toolbar css={toolbar} >
                <div></div>
                <div css={centerToolbar}>
                    <Typography css={heading} variant="h2" align="center">Recipes</Typography>
                    <img css={image} src={recipes} alt="recipes" height="60" />
                </div>
                <div>
                    {!loggedIn && <Button css={button} variant="contained" onClick={()=>setCurrentForm("register")}>Register</Button>}
                    {!loggedIn && <Button css={button} variant="contained" onClick={()=>setCurrentForm("login")}>Login</Button>}
                    {loggedIn && <Profile loggedInUser={user}/>} 
                    {/* add profile functionality */}
                </div>
            </Toolbar>
        </AppBar>
        <Grow in>
            <Container>
                <Grid container css={mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={currentForm ? 8 : 12}>
                        <Recipes setCurrentId={setCurrentId} currentId={currentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {currentForm === 'login' && <Login />}
                        {currentForm === 'register' && <Register />}
                        {currentForm === 'upload' && <Form />}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    </Container>
    )
}

export default App