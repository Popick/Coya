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


function addRow() {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);
    for (let i = 0; i < 5; i++) {
      const cell = newRow.insertCell(i);
      cell.innerHTML = `Row ${table.rows.length}, Column ${i + 1}`;
    }
}

function addRequest() {
    window.location.href = 'add_request.html';
}

function addOffer() {
    window.location.href = 'add_offer.html';
}

$(document).ready(function() {
    var i=0;

    function addRequest() {
        window.location.href = 'add_request.html';
    }

    function printToConsole() {
        const name_input = document.getElementById('input1').value;
        const location_input = document.getElementById('input2').value;
        const contact_input = document.getElementById('input3').value;
        const info_input = document.getElementById('input4').value;
    
        console.log('Input 1:', name_input);
        console.log('Input 2:', location_input);
        console.log('Input 3:', contact_input);
        console.log('Input 4:', info_input);
        
        const postData = {
            name: name_input,
            location_input: location_input,
            contact_input: contact_input,
            info_input: info_input,
            active: true
        };
    
        writeDatabase(postData)
    }

    function writeDatabase(postData){
        console.log("writeDatabase");

        const db = getDatabase();
      
        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'testing')).key;
      
        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/testing3/' + newPostKey] = postData;
        i=i+1;
        return update(ref(db), updates);

    }

    $('#writeNewR').click(printToConsole);
    $('#addR').click(addRequest);
});
