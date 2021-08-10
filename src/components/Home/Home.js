import React, {useState, useEffect} from 'react'
import './Home.css'
import {db,  auth} from '../../firebase.js'
import { Button } from '@material-ui/core'
import firebase from 'firebase'

const Home = () => {

    const [books, setBooks] = useState([])
    const [bookName, setBookName] = useState('')
    const [genre, setGenre] = useState('')
    const [authors, setAuthors] = useState([])
    const [author, setAuthor] = useState([])

    const [temp, setTemp] = useState('')

    useEffect(() => {
        db.collection('books').onSnapshot(snapshot => {
            setBooks(snapshot.docs.map(doc => ({
                id: doc.id,
                book: doc.data()
            })))
        })
        db.collection('author').onSnapshot(snapshot => {
            setAuthors(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name
                // console.log(doc.data().name)
            })))
        })
    }, [])

    const addBook = (e) => {
        e.preventDefault()
        const bookNames = books.map(book => book.book.name)
        if(!bookNames.includes(bookName)) {
            db.collection('books').add({
                name: bookName,
                genre: genre,
                author: author,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        setBookName('')
        setGenre('')
        setAuthor('')

    }

    return (
        <div className='home'>
            <div className='home__content'>
                <div className='home__heading'>
                    <h2>List of Books</h2>
                </div>
                <div className='home__bookList'>
                    {books.map(({id, book}) => (
                        <div className='home__bookData' key={id}>{book.name}</div>

                    ))}
                </div>
            </div>
            
            <div className='home__bookForm'>
                <form>
                    <span>Book Name:</span><input className='home__bookName' type='text' title='bookName' value={bookName} onChange={(e) => setBookName(e.target.value)}/>
                    <span>Genre:</span><input className='home__bookGenre' type='text' title='genre' value={genre} onChange={(e) => setGenre(e.target.value)}/>
                    <span>Author:</span>
                    
                    
                    <select className='home__bookAuthor' title='author' value={author} onChange={(e) => {setAuthor(e.target.value)}}> 
                        {authors.map(({id, name}) => (
                            <option id={id} value={name}>{name}</option>
                        ))}
                    </select>
                    <Button disabled={!bookName || !genre || !author} type='submit' onClick={(e) => {addBook(e)}} className='home__submit' variant='contained' color='primary'>Add Book</Button>
                </form>
            </div>
            {/* <h3>{author}</h3> */}
        </div>
    )
}

export default Home
