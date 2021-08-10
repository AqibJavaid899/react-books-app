import React, {useState, useEffect} from 'react'
import {db,  auth} from '../../firebase.js'


interface bookSchema {
    name: string;
    genre: string;
    author: string;
}

const Home = () => {

    const [books, setBooks] = useState<bookSchema[] | null>(null)

    useEffect(() => {
        db.collection('books').onSnapshot((snapshot: { docs: { map: (arg0: (doc: { data: () => any }) => { books: any }) => React.SetStateAction<bookSchema[] | null> } }) => {
            setBooks(snapshot.docs.map((doc: { data: () => any }) => ({
                books: doc.data(),
                // books: {...books, id: doc.id}
            })))
        })
    }, [])

    return (
        <div>
            <h2>This is Homepage!!</h2>
            <h3>{books}</h3>
        </div>
    )
}

export default Home
