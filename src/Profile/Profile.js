import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import {button} from "./styles"
import { useDispatch } from "react-redux";
import { logout } from "../actions/user";

const Profile = ({loggedInUser}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const dispatch = useDispatch()

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        handleClose();
        dispatch(logout())
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
                {loggedInUser.username}
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
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
        </div>
        
    )
}

export default Profile;