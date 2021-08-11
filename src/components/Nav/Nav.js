import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import './Nav.css'
import { Link } from 'react-router-dom'
import {auth} from '../../firebase'

const Nav = () => {

    const logOut = (e) => {
        e.preventDefault()
        auth.signOut()
    }
    
    return (
        <div className='nav'>
            <div className='nav__left'>
                <Link to="/"> 
                    <button className='nav__leftHeading'>We Love Books!</button>
                </Link>
            </div>
            <div className='nav__right'>
            <Link to="/addAuthor"> 
                    <button className="nav__addAuthor">Add Author</button>
                </Link>
                <Link to="/login"> 
                    <button className="nav__login">Login</button>
                </Link>
                <Link to="/signup"> 
                    <button className='nav__signup'>Sign Up</button>
                </Link>
                {auth ? <button onClick={(e) => {logOut(e)}} className='nav__logout'>Logout</button> : null}
            </div>
        </div>
    )
}

export default Nav