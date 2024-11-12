/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material'
import { buttonSubmit, fileInput, form, paper, root } from './styles'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { postRecipe } from '../actions/recipes'

const Form = () => {
    const [postData, setPostData] = useState({name: '', description: '', instructions: '', ingredients: [], tags: ''})
    const [ingredients, setIngredients] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        const [id, quantity] = ingredients.split(",")
        const newIngredients = {id,quantity}
        setPostData({...postData, ingredients: [newIngredients]})

        dispatch(postRecipe(postData))
    }

    const clear = () => {

    }

    return (
        <Paper css={paper}>
            <form autoComplete='off' noValidate css={`${root} ${form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>Upload a recipe</Typography>
                <TextField name="name" variant='outlined' label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({...postData, name: e.target.value})} />
                <TextField name="description" variant='outlined' label="Description" fullWidth value={postData.description} onChange={(e) => setPostData({...postData, description: e.target.value})} />
                <TextField name="instructions" variant='outlined' label="Instructions" fullWidth value={postData.instructions} onChange={(e) => setPostData({...postData, instructions: e.target.value})} />
                <TextField name="ingredients" variant='outlined' label="Ingredients" fullWidth value={ingredients} onChange={(e) => {setIngredients(e.target.value)}} />
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