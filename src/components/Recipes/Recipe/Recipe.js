/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Rating,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  card,
  cardActions,
  details,
  media,
  overlay,
  overlay2,
  title,
  fullscreenMedia,
  fullscreenCard,
  fullscreenCardActions,
  allComments,
} from "./styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { deleteRecipe } from "../../../actions/recipes";
import placeholder from "../../../images/food.jpg"
import { createRating, deleteRating, patchRating } from "../../../actions/ratings";
import { postCommentsById } from "../../../actions/comments";



const Recipe = ({ recipe, setCurrentId, currentId, showDelete, setCurrentForm, user }) => {
  const ratings = useSelector((state) => state.ratings);
  const comments = useSelector((state) => state.comments);
  const recipeRatings = ratings.filter((rating) => rating.id === recipe.id);
  const average = recipeRatings[0] ? recipeRatings[0].average.toFixed(2) : "0.00";
  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState("")
  const [addingComment, setAddingComment] = useState(null)
  const [showCommentError, setShowCommentError] = useState(null)
  
  const userRating = recipeRatings[0]?.ratings.filter(rating => rating.user_id === user?.id)[0]?.rating

  const [anchorEl, setAnchorEl] = useState(null);

  const handleEditMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleClose();
    dispatch(deleteRecipe(recipe.id))
    
  }

  const handleEdit = () => {
    handleClose()
    setCurrentForm("edit")
    setCurrentId(recipe.id)
  }

  const handleRatingChange = (value) => {
    if(!userRating) dispatch(createRating(recipe.id, {rating: value}))
    else if(userRating === value) dispatch(deleteRating(recipe.id))
    else dispatch(patchRating(recipe.id, {rating:value}))
  }

  const handleCancelComment = () => {
    setAddingComment(false)
    setNewComment("")
    setShowCommentError(false)
  }

  const handleSubmitComment = () => {
    if(!user.username) {
      setShowCommentError(true)
      return
    }
    dispatch(postCommentsById(recipe.id, {body: newComment}))
    setNewComment("")
  }

  return (
    <Card css={currentId == recipe.id ? fullscreenCard : card}>
      <CardMedia
        css={currentId == recipe.id ? fullscreenMedia : media}
        image={placeholder}
        title={recipe.name}
      />
      <div css={overlay}>
        <Typography variant="h6">{recipe.created_by}</Typography>
        <Typography variant="body2">
          {moment(recipe.created_at).fromNow()}
        </Typography>
      </div>

      {showDelete && !currentId && (
        <div css={overlay2}>
          <IconButton
            onClick={handleEditMenuClick}
            aria-controls={Boolean(anchorEl) ? "edit-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) ? true : undefined}
          >
            <MoreHorizIcon size="small" sx={{ color: "white" }}></MoreHorizIcon>
          </IconButton>
          <Menu
            id="edit-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </div>
      )}

      <div css={details}>
        <Typography variant="body2" color="textSecondary">
          {recipe.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography css={title} variant="h5" gutterBottom>
        {recipe.name}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {recipe.description}
        </Typography>
        {recipe.id == currentId ? (
          <div>
            <br></br>
            <Typography variant="h5">Instructions:</Typography>
            {recipe.instructions.split("\n").map((line) => {
              return <Typography variant="h6">{line}</Typography>;
            })}
          </div>
        ) : null}
      </CardContent>


      <CardActions css={currentId == recipe.id ? fullscreenCardActions : cardActions}>
        <Button size="small" color="primary" onClick={() => {}}>
          &nbsp; Avg Rating &nbsp;
          {average}
        </Button>
        <Rating
          name="rating"
          precision={1}
          value={userRating || 0}
          onChange={(e) => {
            handleRatingChange(+e.target.value);
          }}
        ></Rating>
        {currentId == null ? (
          <Button
            color="primary"
            size="small"
            onClick={() => setCurrentId(recipe.id)}
          >
            <FullscreenIcon></FullscreenIcon>
          </Button>
        ) : null}
      </CardActions>
      <CardContent>
      {currentId ? (
          <div>
            <Typography variant="h6">Comments ({comments.length})</Typography>
            {comments.map((comment) => (
            <div key={comment.id} css={allComments}>
              <Typography variant="subtitle2" fontWeight="bold">{comment.username}</Typography>
              <Typography variant="body2">{comment.body}</Typography>
            </div>
          ))}
            <TextField name="comment" variant="outlined" label="Leave a comment" fullWidth value={newComment} onChange={(e) => setNewComment(e.target.value)} onClick={()=>setAddingComment(true)}></TextField>
            {addingComment && 
            <div>
              <Button onClick={handleCancelComment}>Cancel</Button>
              <Button onClick={handleSubmitComment}>Comment</Button>
              {showCommentError && <Alert severity="error">You must login to leave a comment</Alert>}
            </div>}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default Recipe;
