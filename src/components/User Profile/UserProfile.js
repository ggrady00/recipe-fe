/** @jsxImportSource @emotion/react */
import { Avatar, IconButton, Paper, Typography } from "@mui/material";
import { avatar, avatarIcon, editButton, paper, profile } from "./styles";
import EditIcon from '@mui/icons-material/Edit';



const UserProfile = ({user}) => {

    return (
        <Paper css={paper}>
            <div css={profile}>
                <div css={avatarIcon}>
                    <Avatar src={user.profile_pic} css={avatar} />
                    <IconButton css={editButton}>
                        <EditIcon />
                    </IconButton>
                </div>
                <Typography>{user.username}</Typography>
            </div>
            <Typography>{user.profile_info}</Typography>
        </Paper>
    )
}

export default UserProfile;