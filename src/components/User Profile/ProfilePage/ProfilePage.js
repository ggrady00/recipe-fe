/** @jsxImportSource @emotion/react */
import { Avatar, IconButton, Paper, Typography, Button, TextField, Divider, Alert } from "@mui/material";
import { avatar, avatarIcon, buttons, editButton, paper, profile, profileInfo, topBar } from "./styles";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserError, patchProfile } from "../../../actions/user";
import { getRecipes } from "../../../actions/recipes";


const ProfilePage = ({user, recipes, savedRecipes, myRatings, setCurrentProfileForm, myComments}) => {
    
    const [editingProfile, setEditingProfile] = useState(null)
    const [profileData, setProfileData] = useState({username: "", profile_info: ""})
    const dispatch = useDispatch()
    const {error} = useSelector((state) => state.user)
    
    

    useEffect(()=>{
        if(editingProfile) {
            setProfileData({username: user.username, profile_info: user.profile_info})
        }
    },[editingProfile])

    const handleSaveChanges = async () => {
        const success = await dispatch(patchProfile(profileData))
        if(success) {
            setEditingProfile(false)
            dispatch(getRecipes())
        }
        
    }

    const fileInputRef = useRef(null);

    const handleOpenFilePicker = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const success = await dispatch(patchProfile({profile_pic: file}))
    }
    

    return (
        <Paper css={paper}>
            <div css={topBar}>
                <div css={profile}>
                    <div css={avatarIcon}>
                        <Avatar src={user.profile_pic} css={avatar} />
                        {editingProfile && <IconButton  css={editButton} onClick={handleOpenFilePicker}> 
                            <EditIcon /> {/*Add profile pic */}
                            <input  type="file" style={{ display: "none" }} accept="image/" onChange={handleImageUpload} ref={fileInputRef} />
                        </IconButton>}
                    </div>
                    {!editingProfile && <Typography>{user.username}</Typography>}
                    {editingProfile && <TextField name="username" variant="outlined" label="Username" value={profileData.username} onChange={(e)=>setProfileData({...profileData, username: e.target.value})}></TextField>}
                </div>
                <div css={buttons}>
                    {editingProfile && <Button type="button" variant="contained" onClick={handleSaveChanges}>Save Changes</Button>}
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button variant="contained" onClick={()=>{
                        if(editingProfile) dispatch(clearUserError())
                        setEditingProfile(editingProfile===true ? false : true)
                    }}>{editingProfile ? "Cancel" : "Edit Profile"}</Button>
                </div>
            </div>
            <div css={profileInfo}>
                <Typography variant="h6">Profile Info</Typography>
                {!editingProfile && <Typography>{user.profile_info}</Typography>}
                {editingProfile && <TextField name="profile_into" variant="outlined" label="Profile Info" value={profileData.profile_info} onChange={(e)=>setProfileData({...profileData, profile_info: e.target.value})} fullWidth multiline minRows={5}></TextField>}
            </div>
            <Divider></Divider>
            <div>
                <Typography>Recipes Uploaded: {recipes.filter(recipe => recipe.created_by === user.username).length}</Typography>
                <Typography>Saved Recipes: {savedRecipes.length}</Typography>
                <Typography onClick={()=>setCurrentProfileForm("myRatings")} sx={{ cursor: "pointer", textDecoration: "underline" }}>Ratings Given: {myRatings.length}</Typography>
                <Typography onClick={()=>setCurrentProfileForm("myComments")} sx={{ cursor: "pointer", textDecoration: "underline" }}>Comments Left: {myComments.length}</Typography>

            </div>
        </Paper>
    )
}

export default ProfilePage;