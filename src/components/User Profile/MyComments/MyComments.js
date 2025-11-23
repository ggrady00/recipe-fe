/** @jsxImportSource @emotion/react */

import { Button, Typography, Box } from "@mui/material";
import { commentBox, commentBoxContent, commentInfo } from "./styles";
import moment from "moment";

const MyComments = ({setCurrentProfileForm, myComments, recipes, setCurrentId, setPreviousForm, setCurrentForm, setPreviousProfileForm, setHighlightMyComment}) => {

    const formattedComments = myComments.map(comment => {
        const recipe = recipes.find((r) => r.id === comment.recipe_id)
        return {
            ...comment,
            recipe_name: recipe.name
        }
    }).sort((a,b) => new Date(b.created_at) - new Date(a.created_at))

    const handleCommentClick = (comment) => {
        console.log(comment)
        setPreviousForm("profile");
        setPreviousProfileForm("myComments");
        setCurrentForm("");
        setCurrentId(comment.recipe_id);
        setHighlightMyComment(comment.id)
    }

    return (
        <div>
            <Button onClick={() => setCurrentProfileForm("profilePage")}>Back</Button>
            {formattedComments.map((comment) => (
                <Box onClick={() => handleCommentClick(comment)} css={commentBox} key={comment.id}>
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