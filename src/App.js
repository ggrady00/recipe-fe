import React from "react";
import {Container, AppBar, Typography, Grow, Grid} from '@mui/material'

import recipes from "./images/recipes.png"
import Form from "./Form/Form";
import Posts from "./Posts/Posts";

const App = () => {
    return (
    <Container maxWidth="lg">
        <AppBar position="static" color="inherit">
            <Typography variant="h2" align="center">Recipes</Typography>
            <img src={recipes} alt="recipes" height="60" />
        </AppBar>
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    </Container>
    )
}

export default App