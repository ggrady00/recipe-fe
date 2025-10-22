/** @jsxImportSource @emotion/react */
import { Avatar, IconButton, Paper, Typography, Button, TextField, Divider, Alert } from "@mui/material";
import { avatar, avatarIcon, buttons, editButton, paper, profile, profileInfo, topBar } from "./styles";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchProfile } from "../../actions/user";
import { getRecipes } from "../../actions/recipes";


const UserProfile = ({user}) => {
    
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
    

    return (
        <Paper css={paper}>
            <div css={topBar}>
                <div css={profile}>
                    <div css={avatarIcon}>
                        <Avatar src={user.profile_pic} css={avatar} />
                        {editingProfile && <IconButton css={editButton}> 
                            <EditIcon />
                        </IconButton>}
                    </div>
                    {!editingProfile && <Typography>{user.username}</Typography>}
                    {editingProfile && <TextField name="username" variant="outlined" label="Username" value={profileData.username} onChange={(e)=>setProfileData({...profileData, username: e.target.value})}></TextField>}
                </div>
                <div css={buttons}>
                    {editingProfile && <Button type="button" variant="contained" onClick={handleSaveChanges}>Save Changes</Button>}
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button variant="contained" onClick={()=>setEditingProfile(editingProfile==true ? false : true)}>{editingProfile ? "Cancel" : "Edit Profile"}</Button>
                </div>
            </div>
            <div css={profileInfo}>
                <Typography variant="h6">Profile Info</Typography>
                {!editingProfile && <Typography>{user.profile_info}</Typography>}
                {editingProfile && <TextField name="profile_into" variant="outlined" label="Profile Info" value={profileData.profile_info} onChange={(e)=>setProfileData({...profileData, profile_info: e.target.value})} fullWidth multiline minRows={5}></TextField>}
            </div>
            <Divider></Divider>
        </Paper>
    )
}

export default UserProfile;