/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from "react";
import {Container, AppBar, Typography, Grow, Grid2} from '@mui/material'
import {useDispatch} from 'react-redux'

import { getRecipes } from "./actions/recipes"
import { getRatings } from "./actions/ratings";
import recipes from "./images/recipes.png"
import Form from "./Form/Form";
import Recipes from "./Recipes/Recipes"
import Register from "./Register/Register";
import Login from "./Login/Login";
import { appBar, heading, image, mainContainer } from "./styles";

const App = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getRecipes())
        dispatch(getRatings())
        console.log(currentId)
    },[currentId, dispatch])

    return (
    <Container maxWidth="lg">
        <AppBar css={appBar} position="static" color="inherit">
            <Typography css={heading} variant="h2" align="center">Recipes</Typography>
            <img css={image} src={recipes} alt="recipes" height="60" />
        </AppBar>
        <Grow in>
            <Container>
                <Grid2 container css={mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid2 item xs={12} sm={7}>
                        <Recipes setCurrentId={setCurrentId} currentId={currentId} />
                    </Grid2>
                    <Grid2 item xs={12} sm={4}>
                        {/* <Login /> */}
                        {/* <Register /> */}
                        {/* <Form /> */}
                    </Grid2>
                </Grid2>
            </Container>
        </Grow>
    </Container>
    )
}

export default App