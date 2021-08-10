import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import './AuthorForm.css'
import {db,  auth} from '../../firebase.js'
import firebase from 'firebase'


const Login = () => {

    const [author, setAuthor] = useState('')

    const addAuthor = (e) => {
        e.preventDefault()
        db.collection('author').add({
            name: author,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setAuthor('')
    }

    return (
        <div className='author'>
            <div className='author__heading'>
                <h2>Create a new Author</h2>
            </div>
            <div className='author__form'>
                <form>
                    <span>Author Name:</span><input className='author__name' type='text' title='author' value={author} onChange={(e) => setAuthor(e.target.value)}/>
                    <Button disabled={!author} type='submit' onClick={(e) => {addAuthor(e)}} className='author__submit' variant='contained' color='primary'>Create Author</Button>
                </form>
            </div>
        </div>
    )
}

export default Login
