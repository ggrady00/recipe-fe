/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from "react";
import {Container, AppBar, Typography, Grow, Grid, Button, Toolbar, Autocomplete, TextField} from '@mui/material'
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
import { appBar, heading, image, mainContainer, button, toolbar, centerToolbar, rightToolbar, filterBar, filterFields} from "./styles";

const App = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const [currentForm, setCurrentForm] = useState('')
    const user = useSelector((state) => state.user)
    const [loggedIn, setLoggedIn] = useState(null)
    const [filterRecipesByUser, setFilterRecipesByUser] = useState(null)
    const allIngredients = useSelector((state) => state.ingredients)
    const allTags = useSelector((state) => state.tags)
    const [filteringRecipes, setFilteringRecipes] = useState(null)
    const [filterIngredients, setFilterIngredients] = useState([])
    const [filterTags, setFilterTags] = useState([])

    useEffect(()=>{
        dispatch(getRecipes())
        dispatch(getRatings())
        dispatch(getIngredients())
        dispatch(getTags())
    },[dispatch])

    useEffect(()=>{
        if (Object.keys(user).length && !user.error) {
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
        setFilteringRecipes(false)
    }

    const handleClearFilter = () => {
        setFilterIngredients([])
        setFilterTags([])
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
                    {loggedIn && <Profile loggedInUser={user} setFilterRecipesByUser={setFilterRecipesByUser}/>} 
                    {/* add profile functionality */}
                </div>
            </Toolbar>
        </AppBar>
        <div css={filterBar}>
        <Button css={button} variant="contained" onClick={()=>setFilteringRecipes(filteringRecipes === true ? false : true)}>Filter</Button>
        {filteringRecipes && 
        <div css={filterFields}>
        <Autocomplete
            className="filter-autocomplete"
            multiple
            options={allIngredients || []}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => setFilterIngredients(value)}
            value={filterIngredients}
            renderInput={(params) => (
                <TextField {...params} label="Filter Ingredients"/>
            )}
        ></Autocomplete>
        <Autocomplete
        className="filter-autocomplete"
            multiple
            options={allTags || []}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => setFilterTags(value)}
            value={filterTags}
            renderInput={(params) => (
                <TextField {...params} label="Filter Tags"/>
            )}
        ></Autocomplete>
        <Button css={button} variant="contained" onClick={handleClearFilter}>Clear</Button>
        </div>}
        </div>
        <Grow in>
            <Container>
                <Grid container css={mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={currentForm ? 8 : 12}>
                        {(currentForm !== "upload" && currentForm !== "edit") && <Recipes setCurrentId={setCurrentId} currentId={currentId} filterRecipesByUser={filterRecipesByUser} setCurrentForm={setCurrentForm} filterIngredients={filterIngredients} filterTags={filterTags}/>}
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