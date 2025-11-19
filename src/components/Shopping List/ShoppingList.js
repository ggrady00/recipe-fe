/** @jsxImportSource @emotion/react */
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { quantity, shoppingListBox, shoppingListItem } from "./styles";
import { useState } from "react";
import { deleteShoppingListItem, patchShoppingListItems } from "../../actions/shopping-list";
import DeleteIcon from '@mui/icons-material/Delete';



const ShoppingList = () => {
    const dispatch = useDispatch()
    const shoppingList = useSelector(state => state.shoppingList)
    const [editingId, setEditingId] = useState(null)
    const [patchData, setPatchData] = useState('')

    const handleDeleteShoppingListItem = (id) => {
        dispatch(deleteShoppingListItem(id))
        setEditingId(null)
    }

    const handlePatchShoppingList = (item) => {
        dispatch(patchShoppingListItems(item.id, {quantity: patchData}))
        setEditingId(null)
    }

    const handleEditItem = (item) => {
        setEditingId(editingId === item.id ? null : item.id)
        setPatchData(item.quantity)
    }

    return (
        <div>
        {shoppingList.sort((a,b) => a.id - b.id).map(item => (
            <Box key={item.id} css={shoppingListBox}>
                <div css={shoppingListItem}>
                <div css={quantity}>
                    {editingId !== item.id && <Typography css={quantity}>{item.quantity}</Typography>}
                    {editingId === item.id && <TextField name="Quantity" value={patchData} onChange={(e) => setPatchData(e.target.value)}></TextField>}
                </div>
                <Typography>{item.ingredient}</Typography>
                </div>
                {editingId === null || editingId === item.id ? (<Button onClick={()=>handleEditItem(item)}>{editingId === item.id ? "Cancel": "Edit"}</Button>) : null}
                {editingId === item.id && <Button onClick={()=>handlePatchShoppingList(item)}>Save</Button>}
                {editingId === item.id && <IconButton onClick={()=>handleDeleteShoppingListItem(item.id)}><DeleteIcon /></IconButton>}
            </Box>
        ))}
        </div>
    )
}

export default ShoppingList;