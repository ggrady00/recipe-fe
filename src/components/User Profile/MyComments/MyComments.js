/** @jsxImportSource @emotion/react */

import { Button, Typography, Box } from "@mui/material";
import { commentBox, commentBoxContent, commentInfo } from "./styles";
import moment from "moment";

const MyComments = ({setCurrentProfileForm, myComments, recipes, setCurrentId, setPreviousForm, setCurrentForm, setPreviousProfileForm}) => {

    const formattedComments = myComments.map(comment => {
        const recipe = recipes.find((r) => r.id === comment.recipe_id)
        return {
            ...comment,
            recipe_name: recipe.name
        }
    }).sort((a,b) => new Date(b.created_at) - new Date(a.created_at))

    const handleCommentClick = (recipeId) => {
        setPreviousForm("profile");
        setPreviousProfileForm("myComments");
        setCurrentForm("");
        setCurrentId(recipeId);
    }

    return (
        <div>
            <Button onClick={() => setCurrentProfileForm("profilePage")}>Back</Button>
            {formattedComments.map((comment) => (
                <Box onClick={() => handleCommentClick(comment.recipe_id)} css={commentBox}>
                    <div css={commentBoxContent}>
                        <div css={commentInfo}>
                            <Typography>{comment.recipe_name}</Typography>
                            <Typography variant="subtitle2">{moment(comment.created_at).fromNow()}</Typography>
                        </div>
                        <Typography>{comment.body}</Typography>
                    </div>
                </Box>
            ))}
        </div>
    )
}

export default MyComments;