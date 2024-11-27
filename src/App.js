/** @jsxImportSource @emotion/react */
import React, {useEffect} from "react";
import {Container, AppBar, Typography, Grow, Grid} from '@mui/material'
import {useDispatch} from 'react-redux'

import { getRecipes } from "./actions/recipes"
import { getRatings } from "./actions/ratings";
import recipes from "./images/recipes.png"
import Form from "./Form/Form";
import Recipes from "./Recipes/Recipes"
import Register from "./Register/Register";
import { appBar, heading, image, mainContainer } from "./styles";

const App = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getRecipes())
        dispatch(getRatings())
    },[dispatch])

    return (
    <Container maxWidth="lg">
        <AppBar css={appBar} position="static" color="inherit">
            <Typography css={heading} variant="h2" align="center">Recipes</Typography>
            <img css={image} src={recipes} alt="recipes" height="60" />
        </AppBar>
        <Grow in>
            <Container>
                <Grid container css={mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Recipes />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Register />
                        {/* <Form /> */}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    </Container>
    )
}

export default App