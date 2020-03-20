import firebase from 'firebase'
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyD76qvdqJMn6Cu5ZCly-a39-j0vO5rNhRg",
    authDomain: "campus-recruitment-syste-fc6f4.firebaseapp.com",
    databaseURL: "https://campus-recruitment-syste-fc6f4.firebaseio.com",
    projectId: "campus-recruitment-syste-fc6f4",
    storageBucket: "campus-recruitment-syste-fc6f4.appspot.com",
    messagingSenderId: "1053982818426",
    appId: "1:1053982818426:web:26cb92661528b6fa9f7bc3"
  };

  firebase.initializeApp(firebaseConfig)
  export default firebase;