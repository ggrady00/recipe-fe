/** @jsxImportSource @emotion/react */
import { Box, Button, Grid2, Rating, Typography } from "@mui/material";
import { grid, ratingsBox, ratingsBoxContent } from "./styles";

const MyRatings = ({
  setCurrentProfileForm,
  myRatings,
  recipes,
  setCurrentId,
  setPreviousForm,
  setCurrentForm,
  setPreviousProfileForm,
}) => {
  const formattedRatings = myRatings.map((rating) => {
    const recipe = recipes.find((r) => r.id === rating.recipe_id);
    return {
      ...rating,
      recipe_name: recipe.name,
    };
  });

  const handleRatingClick = (recipeId) => {
    setPreviousForm("profile");
    setPreviousProfileForm("myRatings");
    setCurrentForm("");
    setCurrentId(recipeId);
  };

  return (
    <div>
      <Button onClick={() => setCurrentProfileForm("profilePage")}>Back</Button>
      <Grid2 css={grid} container>
        {formattedRatings.map((rating) => (
          <Grid2 key={rating.id}>
            <Box
              onClick={() => handleRatingClick(rating.recipe_id)}
              css={ratingsBox}
            >
              <div css={ratingsBoxContent}>
                <Typography>{rating.recipe_name}</Typography>
                <Rating precision={1} value={rating.rating} readOnly></Rating>
              </div>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default MyRatings;
