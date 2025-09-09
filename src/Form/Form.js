/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { Autocomplete, Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { buttonSubmit, fileInput, form, ingredientList, paper, root } from './styles'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { postRecipe } from '../actions/recipes'

const Form = () => {
    const [postData, setPostData] = useState({name: '', description: '', instructions: '', ingredients: [], tags: []})
    const [ingredients, setIngredients] = useState([])
    const dispatch = useDispatch()
    const allIngredients = useSelector((state) => state.ingredients)
    const [addingIng, setAddingIng] = useState(null)
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const newPostData = {...postData}
        newPostData.ingredients = ingredients

        dispatch(postRecipe(newPostData))
        clear()
    }

    const handleAddIngredient = (e, value) => {
        const newIng = {name: value.name, quantity: "", id: value.id}
        setIngredients([...ingredients, newIng])
    }

    const handleQuantityChange = (value, index) => {
        const updatedIngredients = [...ingredients]
        updatedIngredients[index].quantity = value
        setIngredients(updatedIngredients)
    }

    const handleIngDelete = (index) => {
        const updatedIngredients = [...ingredients]
        updatedIngredients.splice(index, 1)
        setIngredients(updatedIngredients)
    }

    const clear = () => {
        setIngredients([])
        setPostData({name: '', description: '', instructions: '', ingredients: [], tags: []})
    }

    return (
        <Paper css={paper}>
            <form autoComplete='off' noValidate css={`${root} ${form}`} onSubmit={handleSubmit}>
                <Typography variant='h4'>Upload a recipe</Typography>
                <TextField name="name" variant='outlined' label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({...postData, name: e.target.value})} />
                <TextField name="description" variant='outlined' label="Description" fullWidth value={postData.description} onChange={(e) => setPostData({...postData, description: e.target.value})} />
                <TextField name="instructions" variant='outlined' label="Instructions" fullWidth value={postData.instructions} onChange={(e) => setPostData({...postData, instructions: e.target.value})} />
                
                {/* <TextField name="ingredients" variant='outlined' label="Ingredients" fullWidth value={ingredients} onChange={(e) => {setIngredients(e.target.value)}} /> */}
                <div style={{display: "flex", alignItems: "center"}}>
                    <Typography variant='h6'>Ingredients</Typography>
                    <Button onClick={()=>setAddingIng(addingIng === true ? false : true)}>
                        {addingIng ? <RemoveIcon /> : <AddIcon /> }
                    </Button>
                </div>
                {addingIng === true && 
                <Autocomplete 
                options={allIngredients || []}
                getOptionLabel={(option) => option.name}
                onChange={handleAddIngredient}
                value={null}
                renderInput={(params)=>(
                    <TextField {...params} variant='outlined' label="Ingredients" fullWidth />)}
                />}
                {ingredients.map((ing, index) => (
                    <div css={ingredientList} key={`Ingredient ${index}`}>
                    <Box >
                        <TextField
                        variant='outlined'
                        label={`Quantity of ${ing.name}`}
                        value={ing.quantity}
                        onChange={(e) => handleQuantityChange(e.target.value, index)}
                         />
                         
                    </Box>
                    <TextField value={ing.name} variant='outlined' disabled/>
                    <IconButton onClick={() => handleIngDelete(index)}>
                        <DeleteIcon />
                    </IconButton>
                    </div>
                )
                    
                )}


                <TextField name="tags" variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value})} />
                <div css={fileInput}>
                    <FileBase type='file' multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})} />
                </div>
                <Button css={buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form