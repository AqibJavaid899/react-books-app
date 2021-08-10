import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import './Nav.css'
import { Link } from 'react-router-dom'

const Nav = () => {
    
    return (
        <div className='nav'>
            <div className='nav__left'>
                <Link to="/"> 
                    <button className='nav__leftHeading'>We Love Books!</button>
                </Link>
            </div>
            <div className='nav__right'>
                <Link to="/login"> 
                    <button className="nav__login">Login</button>
                </Link>
                <Link to="/signup"> 
                    <button className='nav__signup'>Sign Up</button>
                </Link>
            </div>
        </div>
    )
}

export default Nav
