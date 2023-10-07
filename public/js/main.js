import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, push, child, update} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIW3yIjZOkiWWyefN9AAJdpfB2DTk9yac",
  authDomain: "coya-23834.firebaseapp.com",
  databaseURL: "https://coya-23834-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "coya-23834",
  storageBucket: "coya-23834.appspot.com",
  messagingSenderId: "239042255794",
  appId: "1:239042255794:web:d20825faec43e8223322ab",
  measurementId: "G-LRHG0MY5N2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

$(document).ready(function() {
    var i=0;
    function writeDatabase(){
        console.log("writeDatabase");

        const db = getDatabase();
   
        // A post entry.
        const postData = {
            i: i,
            check: "idk"
        };
      
        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'testing')).key;
      
        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/testing2/' + newPostKey] = postData;
        i=i+1;
        return update(ref(db), updates);

    }

    $('#writedb').click(writeDatabase);
});

