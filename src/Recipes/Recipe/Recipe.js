/** @jsxImportSource @emotion/react */
import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { card, cardActions, details, media, overlay, overlay2, title } from "./styles";
import moment from "moment";

const Recipe = ({recipe}) => {
    return (
        <Card css={card}>
            {/* <CardMedia css={media} image title={recipe.name} /> */}
            <div css={overlay}>
                <Typography variant="h6">{recipe.created_by}</Typography>
                <Typography variant="body2">{moment(recipe.created_at).fromNow()}</Typography>
            </div>
            <div css={overlay2} >
                <Button style={{color: 'white'}} size="small" onClick={()=>{}}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div css={details} >
                <Typography variant="body2" color="textSecondary" >{recipe.tags.map(tag => `#${tag} `)}</Typography>
            </div>
            <Typography css={title} variant="h5" gutterBottom>{recipe.name}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{recipe.description}</Typography>
            </CardContent>
            <CardActions css={cardActions} >
                <Button size="small" color="primary" onClick={()=>{}}>
                    Rating
                    {/* ratings.id */}
                </Button>
                <Button size="small" color="primary" onClick={()=>{}}>
                    <DeleteIcon fontSize="small" />
                    Delete
                    {/* only if logged in as creator */}
                </Button>
            </CardActions>
        </Card>
    )
}

export default Recipe