import firebase from 'firebase'

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDpnLqXBESw09PVvYWin_ZX6_JzKIeb1x4",
    authDomain: "react-books-catalog.firebaseapp.com",
    projectId: "react-books-catalog",
    storageBucket: "react-books-catalog.appspot.com",
    messagingSenderId: "805078756249",
    appId: "1:805078756249:web:3d9e6ee186c3d2e9030108"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }