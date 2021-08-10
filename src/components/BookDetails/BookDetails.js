import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {db,  auth} from '../../firebase.js'

const BookDetails = () => {
    const {bookId, testValue} = useParams()
    const [books, setBooks] = useState([])
    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(false)

    console.log(`Book Id : ${bookId}`)
    // useEffect(() => {

    //     const fetchBooks = async () => {
    //         await db.collection('books').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    //             setBooks(snapshot.docs.map(doc => ({
    //                 if(doc.id === bookId) {
    //                     book: doc.data()
    //                 }
    //             })))
    //         })
    //         // setLoading(true)
    //     }
    //         fetchBooks()
    //         // console.log(books)
    //         // const selectedBook = books.find(item => item.id === bookId)
    //         // console.log(selectedBook)
    // }, [])

    return (
        <div>
            <h2>Book Details Page!!</h2>
            <h2>Book ID : {bookId}</h2>
        </div>
    )
}

export default BookDetails
