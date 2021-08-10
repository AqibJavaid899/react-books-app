import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import './Signup.css'

const Signup = () => {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='signup'>
            <div className='signup__heading'>
                <h2>Register your Account</h2>
            </div>
            <div className='signup__form'>
                <form>
                    <span>Username:</span><input className='signup__user' type='text' title='userName' value={userName} onChange={(e) => setUserName(e.target.value)}/><br />
                    <span>Email Address:</span><input className='signup__email' type='email' title='email' value={email} onChange={(e) => setEmail(e.target.value)}/> <br />
                    <span>Password:</span><input className='signup__password' type='password' title='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button type='submit' onClick={(e) => {e.preventDefault()}} className='signup__submit' variant='contained' color='secondary'>Create Account</Button>
                </form>
            </div>
        </div>
    )
}

export default Signup
