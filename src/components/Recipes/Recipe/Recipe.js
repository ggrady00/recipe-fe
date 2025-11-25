/** @jsxImportSource @emotion/react */
import React, {useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
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
  ingredientList,
} from "./styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { deleteRecipe } from "../../../actions/recipes";
import placeholder from "../../../images/food.jpg";
import Comments from "./Comments/Comments"
import Ratings from "./Ratings/Ratings";
import { deleteSavedRecipes, postSavedRecipes } from "../../../actions/saved-recipes";
import { postShoppingList } from "../../../actions/shopping-list";

const Recipe = ({
  recipe,
  setCurrentId,
  currentId,
  showDelete,
  setCurrentForm,
  user,
  savedRecipes,
  highlightMyComment,
  loggedIn
}) => {
  const dispatch = useDispatch();
  const allIngredients = useSelector(state => state.ingredients)

  const [anchorEl, setAnchorEl] = useState(null);

  const handleEditMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    handleClose();
    dispatch(deleteRecipe(recipe.id));
  };

  const handleEdit = () => {
    handleClose();
    setCurrentForm("edit");
    setCurrentId(recipe.id);
  };

  const handleSaveButton = () => {
    savedRecipes?.some(saved => saved.recipe_id === recipe.id) ? dispatch(deleteSavedRecipes({"recipe_id" : recipe.id})) : dispatch(postSavedRecipes({"recipe_id" : recipe.id}))
  }

  const handleAddToShoppingList = () => {
    const formattedIngs = recipe.ingredients.map(ingredient => {
      const found = allIngredients.find(allIng => ingredient.ingredient === allIng.name)
      return {
        quantity: ingredient.quantity,
        ingredient_id: found.id
      }
    })
    dispatch(postShoppingList(formattedIngs))
  }

  return (


    <Card css={currentId === recipe.id ? fullscreenCard : card}>
      <CardMedia
        css={currentId === recipe.id ? fullscreenMedia : media}
        image={recipe.recipe_pic || placeholder}
        title={recipe.name}
      />
      <div css={overlay}>
        <Typography variant="h6">{recipe.created_by}</Typography>
        <Typography variant="body2">
          {moment(recipe.created_at).fromNow()}
        </Typography>
      </div>


      {/* Edit Recipe Menu */}

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



      {/* Card Content */}

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
        {recipe.id === currentId ? (
          <div>
            <br></br>
            <div style={{display: "flex"}}>
              <Typography variant="h5">Ingredients:</Typography>
              {loggedIn && <Button onClick={handleAddToShoppingList}>Add to Shopping List</Button>}
            </div>
            {recipe.ingredients.map((ingredient, index) => (
              <div css={ingredientList} key={index}>
                <Typography variant="h6" style={{width: "150px"}}>{ingredient.quantity}</Typography>
                <Typography variant="h6">{ingredient.ingredient}</Typography>
              </div>
            ))}
            <br></br>
            <Typography variant="h5">Instructions:</Typography>
            {recipe.instructions.split("\n").map((line, index) => {
              return <Typography key={index} variant="h6">{line}</Typography>;
            })}
          </div>
        ) : null}
      </CardContent>


      <CardActions
        css={currentId === recipe.id ? fullscreenCardActions : cardActions}
      >
        <Ratings recipe={recipe} user={user}></Ratings>
        <Button onClick={handleSaveButton}>{savedRecipes?.some(saved => saved.recipe_id === recipe.id) ? "Unsave" : "Save"}</Button>
        {currentId === null ? (
          <Button
            color="primary"
            size="small"
            onClick={() => setCurrentId(recipe.id)}
          >
            <FullscreenIcon></FullscreenIcon>
          </Button>
        ) : null}
      </CardActions>

      {currentId && <Comments user={user} recipe={recipe} highlightMyComment={highlightMyComment}></Comments>}

    </Card>
  );
};

export default Recipe;
