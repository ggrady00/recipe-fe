import { Button, Rating, Typography } from "@mui/material";


const MyRatings = ({setCurrentForm, myRatings, recipes}) => {
    const formattedRatings = myRatings.map(rating => {
        const recipe = recipes.find(r => r.id === rating.recipe_id)
        return {
            ...rating,
            recipe_name: recipe.name
        }
    })
    console.log(formattedRatings)
    return (
        <div>
            <Button onClick={()=>setCurrentForm("profilePage")}>Back</Button>
            {formattedRatings.map(rating => (
                <div>
                    <Typography>{rating.recipe_name}</Typography>
                    <Rating precision={1} value={rating.rating} readOnly></Rating>
                </div>
            ))}
        </div>
    )
}

export default MyRatings;