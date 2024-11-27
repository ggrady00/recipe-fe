/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Rating } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { card, cardActions, details, media, overlay, overlay2, title } from "./styles";
import moment from "moment";
import { useSelector } from "react-redux";

const ExpandedRecipe = ({recipe, setCurrentId}) => {
    const ratings = useSelector((state) => state.ratings)
    const recipeRatings = ratings.filter(rating => rating.id === recipe.id)
    const average = recipeRatings[0]? recipeRatings[0].average : 0
    const [rating, setRating] = useState(null)
    
    return (
        <></>
    )
}

export default ExpandedRecipe