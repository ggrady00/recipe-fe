/** @jsxImportSource @emotion/react */
import React from "react";
import { Typography, Rating } from "@mui/material";
import { ratingSection } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { createRating, deleteRating, patchRating } from "../../../../actions/ratings";



const Ratings = ({recipe, user}) => {
    const dispatch = useDispatch();

    const ratings = useSelector((state) => state.ratings);
    const recipeRatings = ratings.filter((rating) => rating.id === recipe.id);
    const average = recipeRatings[0]
        ? recipeRatings[0].average.toFixed(2)
        : "0.00";

    const userRating = recipeRatings[0]?.ratings.filter(
        (rating) => rating.user_id === user?.id
    )[0]?.rating;

    const handleRatingChange = (value) => {
        if (!userRating) dispatch(createRating(recipe.id, { rating: value }));
        else if (userRating === value) dispatch(deleteRating(recipe.id));
        else dispatch(patchRating(recipe.id, { rating: value }));
      };

    return (
        <div css={ratingSection}>
        <Typography>{average}</Typography>
        <Rating
          name="rating"
          precision={1}
          value={userRating || 0}
          onChange={(e) => {
            handleRatingChange(+e.target.value);
          }}
        ></Rating>
        <Typography>({recipeRatings[0] ? recipeRatings[0].ratings.length : 0})</Typography>
        </div>
    )
}

export default Ratings