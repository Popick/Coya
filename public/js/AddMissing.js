import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, push, child, update, onValue } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';// TODO: Add SDKs for Firebase products that you want to use

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

const app = initializeApp(firebaseConfig);

$(document).ready(function () {
    function writeDatabase() {
        const name = document.getElementById("name").value;
        const place = document.getElementById("place").value;
        const phone = document.getElementById("phone").value;


        console.log("writeDatabase");
        const db = getDatabase();


        const neadar = {
            Name: name,
            Place: place,
            Phone: phone,
            Status: "נעדר"
        };

         var count = 0;

        for (var key in neadar) {
            if (neadar.hasOwnProperty(key) && neadar[key] === "") {
                count++;
            }
        }
        // Get a key for a new Post.

        if (count==0) {
            const newPostKey = push(child(ref(db), 'testing')).key;
            // Write the new post's data simultaneously in the posts list and the user's post list.
            const updates = {};
            updates['/Missing/' + newPostKey] = neadar;
            alert("תודה רבה על שיתוף הפעולה. עם ישראל חי!")
            return update(ref(db), updates);
        }
        else{
            alert("אנא מלאו את כל השדות")
        }

    }
    $('#writedb').click(writeDatabase);

    function displayDataFromFirebase() {
        const db = getDatabase();
        const dbRef = ref(db, 'testing2');

        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            let displayData = '';
            for (let key in data) {
                displayData += `<div>Key: ${key}, i: ${data[key].i}, check: ${data[key].check}</div>`;
            }
            $('#firebaseData').html(displayData);
        });
    }

    displayDataFromFirebase();

});


function nameExists(nameStr) {
    const branchReference = database.ref('Missing'); // Replace with your branch name

    branchReference.once(nameStr)
        .then(snapshot => {
            snapshot.forEach(childSnapshot => {
                const objectData = childSnapshot.val();
                console.log('Object data:', objectData);
                if (nameStr == objectData.Name){
                    return true;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return true
        });
        return false;
}


document.addEventListener("DOMContentLoaded", function () {
    const chooseButton = document.getElementById("choose_pic");
    const UploadButton = document.getElementById("uploadToFirebaseButton");
    const imageInput = document.getElementById("fileInput");
    const imageContainer = document.getElementById("imageContainer");

    chooseButton.addEventListener("click", function () {
        imageInput.click();
    });

    imageInput.addEventListener("change", function () {
        const selectedFile = imageInput.files[0];
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const image = document.createElement("img");
                image.style.width = '300px'; // Set the desired width in pixels
                image.style.height = '200px'; // Set the desired height in pixels
                image.src = e.target.result;
                imageContainer.innerHTML = ""; // Clear any previous images
                imageContainer.appendChild(image);
            };

            reader.readAsDataURL(selectedFile);
        }
    });

});