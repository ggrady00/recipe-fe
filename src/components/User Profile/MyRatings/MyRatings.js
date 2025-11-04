/** @jsxImportSource @emotion/react */
import { Box, Button, Rating, Typography } from "@mui/material";
import { ratingsBox } from "./styles";


const MyRatings = ({setCurrentProfileForm, myRatings, recipes, setCurrentId, setPreviousForm, setCurrentForm, setPreviousProfileForm}) => {
    const formattedRatings = myRatings.map(rating => {
        const recipe = recipes.find(r => r.id === rating.recipe_id)
        return {
            ...rating,
            recipe_name: recipe.name
        }
    })
    
    const handleRatingClick = (recipeId) => {
        setPreviousForm("profile")
        setPreviousProfileForm("myRatings")
        setCurrentForm("")
        setCurrentId(recipeId)
    }

    return (
        <div>
            <Button onClick={()=>setCurrentForm("profilePage")}>Back</Button>
            {formattedRatings.map(rating => (
                <Box onClick={()=>handleRatingClick(rating.recipe_id)}>
                    <div css={ratingsBox}>
                        <Typography>{rating.recipe_name}</Typography>
                        <Rating precision={1} value={rating.rating} readOnly></Rating>
                    </div>
                </Box>
            ))}
            
        </div>
    )
}

export default MyRatings;