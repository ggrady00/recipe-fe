import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import {button} from "./styles"

const Profile = ({loggedInUser}) => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }


    return (
        
        <div>
            <Button 
            sx={button} 
            variant="contained" 
            onClick={handleClick} 
            aria-controls={Boolean(anchorEl) ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) ? true : undefined}
            >
                {loggedInUser.user.username}
            </Button>
            <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My Recipes</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Log out</MenuItem>
            </Menu>
        </div>
        
    )
}

export default Profile;