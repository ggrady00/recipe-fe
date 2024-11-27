import { useRef, useState, useEffect } from "react";
import {Paper, Typography, TextField, Button} from '@mui/material'
import { buttonSubmit, fileInput, form, paper, root } from './styles'
import { useDispatch, useSelector } from "react-redux";
import {postRegister} from "../actions/user"

const Register = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [matchPwd, setMatchPwd] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(pwd === matchPwd) {
            const newUser = {
                username,
                email,
                password: pwd
            }
            dispatch(postRegister(newUser))
            

        } else {

        }

    }

    return (
        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">User Registration</Typography>
                <TextField name="username" variant="outlined" label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)}></TextField>
                <TextField name="email" variant="outlined" label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
                <TextField name="password" variant="outlined" label="Password" type="password" fullWidth value={pwd} onChange={(e) => setPwd(e.target.value)}></TextField>
                <TextField name="match-password" variant="outlined" label="Re-enter Password" type="password" fullWidth value={matchPwd} onChange={(e) => setMatchPwd(e.target.value)}></TextField>
                <Button css={buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={(e)=>{console.log(user)}} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Register