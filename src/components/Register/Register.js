/** @jsxImportSource @emotion/react */
import { useRef, useState, useEffect } from "react";
import {Paper, Typography, TextField, Button, Alert} from '@mui/material'
import { buttonSubmit, form, paper, root } from './styles'
import { useDispatch, useSelector } from "react-redux";
import {postRegister} from "../../actions/user"

const Register = () => {
    const {error} = useSelector((state) => state.user)
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

    const [formKey, setFormKey] = useState(0);

    const clear = () => {
        setUsername('');
        setEmail('');
        setPwd('');
        setMatchPwd('');
        setFormKey(prev => prev + 1)
    };

    return (
        <Paper css={paper}>
            <form key={formKey} css={`${root} ${form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">User Registration</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField name="username" variant="outlined" label="Username" fullWidth value={username} onChange={(e) => setUsername(e.target.value)}></TextField>
                <TextField name="email" variant="outlined" label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
                <TextField name="password" autoComplete="off" variant="outlined" label="Password" type="password" fullWidth value={pwd} onChange={(e) => setPwd(e.target.value)}></TextField>
                <TextField name="match-password" autoComplete="off" variant="outlined" label="Re-enter Password" type="password" fullWidth value={matchPwd} onChange={(e) => setMatchPwd(e.target.value)}></TextField>
                <Button css={buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} type="button" fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Register