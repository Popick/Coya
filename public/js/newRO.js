import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, push, child, update, onValue} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyCrBs3NPgqQvEcDj6eKOe15mOoHzAgIHY8",
    authDomain: "nanabanana-eb14f.firebaseapp.com",
    databaseURL: "https://nanabanana-eb14f-default-rtdb.firebaseio.com",
    projectId: "nanabanana-eb14f",
    storageBucket: "nanabanana-eb14f.appspot.com",
    messagingSenderId: "76884102277",
    appId: "1:76884102277:web:c536130f12f6543c642dec",
    measurementId: "G-K7ZT2CCDXY"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


function addToDB(type) {
    const name_input = document.getElementById('input1');
    const location_input = document.getElementById('input2');
    const contact_input = document.getElementById('input3');
    const info_input = document.getElementById('input4');

    // Validate each input
    const isNameValid = validateInput(name_input);
    const isLocationValid = validateInput(location_input);
    const isContactValid = validateInput(contact_input);
    const isInfoValid = validateInput(info_input);

    // If all are valid, then proceed
    if (isNameValid && isLocationValid && isContactValid && isInfoValid) {

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const checkedOptions = [];
    
        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            checkedOptions.push(checkbox.name);
          }
        });
        
        const postData = {
            name: name_input.value,
            location_input: location_input.value,
            contact_input: contact_input.value,
            info_input: info_input.value,
            active: true,
            checkedOptions: checkedOptions,
            key : ""
        };
        writeDatabase(postData, type);
    }
}

function writeDatabase(postData, type){
    const db = getDatabase();
  
    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), 'no_key')).key;
    postData.key = newPostKey;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    if (type == 1){
        updates['/pending/requests/' + newPostKey] = postData;
    }
    if (type == 2){
        updates['/pending/offers/' + newPostKey] = postData;
    }

    // Update database and show alert once data is uploaded
    update(ref(db), updates)
        .then(() => {
            alert("תודה לכם על שיתוף הפעולה! 😊");
            window.location.href = 'index.html';
        })
        .catch(error => {
            alert("סליחה נתקלנו בבעיות 😞");
            window.location.href = 'index.html';
        });
}


function showError() {
    $("#errormes").css("display", "block");
}

function clearError() {
    $("#errormes").css("display", "none");
}

function validateInput(inputField) {
    if (!inputField.value.trim()) {
        showError();
        return false;
    } else {
        return true;
    }
}




$(document).ready(function() {
    $('#writeNewR').click(function() {
        addToDB(1);
    });
    
    $('#writeNewO').click(function() {
        addToDB(2);
    });
});




