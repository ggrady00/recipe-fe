/** @jsxImportSource @emotion/react */
import { useRef, useState, useEffect } from "react";
import {Paper, Typography, TextField, Button} from '@mui/material'
import { buttonSubmit, form, paper, root } from './styles'
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../actions/user";


const Login = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            username,
            password: pwd
        }
        dispatch(postLogin(userData))

    }

    return (
        <Paper css={paper}>
            <form css={`${root} ${form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">Login</Typography>
                <TextField name="username" variant="outlined" label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)}></TextField>
                <TextField name="password" variant="outlined" label="Password" type="password" fullWidth value={pwd} onChange={(e) => setPwd(e.target.value)}></TextField>
                <Button css={buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
            </form>
        </Paper>
    )
}

export default Login