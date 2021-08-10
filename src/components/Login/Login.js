import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import './Login.css'
import {auth} from '../../firebase'
import { useDispatch } from 'react-redux'
import { signInUser } from '../../redux/actions/userActions'

const Login = () => {

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const signIn = (e) => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(email, password)
        .then((authUser) => {
            console.log('User Sign In')
            console.log(authUser)
            // useDispatch(signInUser())
        })
        .catch((err) => alert(err.message))
    }

    return (
        <div className='login'>
            <div className='login__heading'>
                <h2>Login to your Account</h2>
            </div>
            <div className='login__form'>
                <form>
                    <span>Email Address:</span><input className='login__email' type='email' title='email' value={email} onChange={(e) => setEmail(e.target.value)}/><br />
                    <span>Password:</span><input className='login__password' type='password' title='password' value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
                    <Button disabled={!email || !password} type='submit' onClick={(e) => {signIn(e)}} className='login__submit' variant='contained' color='secondary'>Login</Button>
                </form>
            </div>
        </div>
    )
}

export default Login
