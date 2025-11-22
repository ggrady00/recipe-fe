/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react'
import { Autocomplete, Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { buttonSubmit, fileInput, form, ingredientList, paper, root } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { postRecipe } from '../../actions/recipes'
import { postIngredients } from '../../actions/ingredients';
import { postTags } from '../../actions/tags';
import { patchRecipe } from '../../actions/recipes';

const Form = ({currentForm, currentId, setCurrentId, setCurrentForm}) => {
    const [postData, setPostData] = useState({name: '', description: '', instructions: '', ingredients: [], tags: []})
    const [ingredients, setIngredients] = useState([])
    const dispatch = useDispatch()
    const allIngredients = useSelector((state) => state.ingredients)
    const allTags = useSelector((state) => state.tags)
    const [addingIng, setAddingIng] = useState(null)
    const [uploadTag, setUploadTag] = useState(null)
    const [uploadIng, setUploadIng] = useState(null)
    const [newIng, setNewIng] = useState("")
    const [myTags, setMyTags] = useState([])
    const [newTag, setNewTag] = useState("")
    const recipes = useSelector((state) => state.recipes)
    const [patchId, setPatchId] = useState(null)
    
    useEffect(()=>{
        if(currentId) {
            const recipe = recipes.filter(recipe => recipe.id == currentId)[0]
            if(recipe) {
                const formatIngredients = recipe.ingredients.map(ing => {
                    const newObj = {
                        name: ing.ingredient,
                        quantity: ing.quantity
                    }
                    return newObj
                })
                const formatTags = recipe.tags.map(tag => {
                    return {"name": tag}
                })
                setPostData({
                    name: recipe.name,
                    description: recipe.description,
                    instructions: recipe.instructions,
                    ingredients: formatIngredients,
                    tags: formatTags
                })
                setIngredients(formatIngredients)
                setMyTags(formatTags)
                setPatchId(recipe.id)
            }
        }
    },[currentId, recipes])
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const newPostData = {...postData}
        ingredients.forEach(myIng => {
            const found = allIngredients.find(allIng => myIng.name === allIng.name)
            myIng.id = found.id
        })
        newPostData.ingredients = ingredients

        const tagIds = myTags.map(tag => {
            const found = allTags.find(allTag => allTag.name === tag.name)
            return found.id
        })

        newPostData.tags = tagIds

        if(currentForm === "edit") {
            dispatch(patchRecipe(patchId, newPostData))
        }
        else dispatch(postRecipe(newPostData))

        clear()
        setCurrentForm("")
        setCurrentId(null)
        
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

    const handleAddNewIng = () => {
        if(!newIng.trim()) return
        dispatch(postIngredients({"name": newIng.trim()}))
        setIngredients([...ingredients, {"name": newIng.trim(), "quantity": ""}])
        setUploadIng(false)
        setNewIng("")
    }

    const handleAddNewTag = () => {
        if(!newTag.trim()) return
        dispatch(postTags({"name" : newTag.trim()}))
        setMyTags([...myTags, {"name": newTag.trim()}])
        setNewTag("")
        setUploadTag(false)
    }

    const clear = () => {
        setIngredients([])
        setMyTags([])
        setPostData({name: '', description: '', instructions: '', ingredients: [], tags: []})
    }

    const fileInputRef = useRef(null);

    const handleOpenFilePicker = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setPostData({...postData, recipe_pic: file})
    }

    return (
        <Paper css={paper}>
            <form autoComplete='off' noValidate css={`${root} ${form}`} onSubmit={handleSubmit}>
                <Typography variant='h4'>Upload a recipe</Typography>
                <TextField name="name" variant='outlined' label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({...postData, name: e.target.value})} />
                <TextField name="description" variant='outlined' label="Description" fullWidth multiline minRows={2} maxRows={3} value={postData.description} onChange={(e) => setPostData({...postData, description: e.target.value})} />
                <TextField name="instructions" variant='outlined' label="Instructions" fullWidth multiline minRows={6} maxRows={10} value={postData.instructions} onChange={(e) => setPostData({...postData, instructions: e.target.value})} />
                
                {/* <TextField name="ingredients" variant='outlined' label="Ingredients" fullWidth value={ingredients} onChange={(e) => {setIngredients(e.target.value)}} /> */}
                <div style={{display: "flex", alignItems: "center"}}>
                    <Typography variant='h6'>Ingredients</Typography>
                    <Button onClick={()=>setAddingIng(addingIng === true ? false : true)}>
                        {addingIng ? <RemoveIcon /> : <AddIcon /> }
                    </Button>
                    
                </div>
                {addingIng === true && 
                <div>
                    <Autocomplete
                options={allIngredients || []}
                getOptionLabel={(option) => option.name}
                onChange={handleAddIngredient}
                value={null}
                renderInput={(params)=>(
                    <TextField {...params} variant='outlined' label="Search Ingredients" fullWidth />)}
                />
                    <Button onClick={()=>setUploadIng(uploadIng==true ? false: true)}>
                        {uploadIng ? "Cancel" : "Add Ingredient" }
                    </Button>
                </div>}
                {uploadIng === true && 
                <div css={form}>
                    <TextField name="add ingredient" variant='outlined' label="Other ingredient" fullWidth value={newIng} onChange={(e)=>{setNewIng(e.target.value)}}/>
                    <Button variant='contained' onClick={handleAddNewIng}>Submit</Button>
                </div>
                }
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


                <div css={form}>
                <Autocomplete
                fullWidth
                multiple
                options={allTags || []}
                getOptionLabel={(option) => option.name}
                onChange={(e, value) => setMyTags(value)}
                value={myTags}
                renderInput={(params) => (
                    <TextField {...params} variant='outlined' label="Search Tags" fullWidth />
                )}
                />
                <Button onClick={()=>setUploadTag( uploadTag== true ? false : true)}>{uploadTag ? "Cancel" : "New Tag"}</Button>
                </div>
                {uploadTag && 
                <div css={form}>
                    <TextField name="add tag" variant='outlined' label="Other tag" fullWidth value={newTag} onChange={(e)=>{setNewTag(e.target.value)}}/>
                    <Button variant='contained' onClick={handleAddNewTag}>Submit</Button>
                </div>}
                {/* <TextField name="tags" variant='outlined' label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value})} /> */}
                <Button onClick={handleOpenFilePicker}>
                    Upload Photo
                    <input  type="file" style={{ display: "none" }} accept="image/" onChange={handleImageUpload} ref={fileInputRef} />
                </Button>
                <Button css={buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form