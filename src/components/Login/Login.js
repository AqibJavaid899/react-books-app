import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import './Login.css'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='login'>
            <div className='login__heading'>
                <h2>Login to your Account</h2>
            </div>
            <div className='login__form'>
                <form>
                    <span>Email Address:</span><input className='login__email' type='email' title='email' value={email} onChange={(e) => setEmail(e.target.value)}/><br />
                    <span>Password:</span><input className='login__password' type='password' title='password' value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
                    <Button type='submit' onClick={(e) => {e.preventDefault()}} className='login__submit' variant='contained' color='secondary'>Login</Button>
                </form>
            </div>
        </div>
    )
}

export default Login
