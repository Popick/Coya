import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, push, child, update, onValue } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';// TODO: Add SDKs for Firebase products that you want to use

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

const app = initializeApp(firebaseConfig);

let rows_data = [];

function populateTableFromFirebase() {
    const db = getDatabase();
    const dbRefrequests = ref(db, 'Missing');


    onValue(dbRefrequests, (snapshot) => {
        const data = snapshot.val();

        if (!data) {
            console.log("No data retrieved from Firebase");
            return;
        }

        const table = document.getElementById('table');
        clearTableExceptFirstRow();

        for (let key in data) {
            const newRow = table.insertRow();
            var cell = newRow.insertCell(0);
            var img = document.createElement("img");

            // Set the source and class for the image
            img.src = "images/defaultpic.jpg";
            img.id = "personImage";

            // Append the image to the cell
            cell.appendChild(img);
            newRow.insertCell(1).innerHTML = data[key].Name;
            newRow.insertCell(2).innerHTML = data[key].Place;
            newRow.insertCell(3).innerHTML = data[key].Phone;
            newRow.insertCell(4).innerHTML = data[key].Status;
            rows_data.push({
                name: data[key].Name, place: data[key].Place, phone: data[key].Phone,
                status: data[key].Status, element: newRow
            })
        }
        console.log(rows_data)
    });
}

function clearTableExceptFirstRow() {
    var table = document.getElementById("table");

    // Get the table rows (excluding the first row)
    var rows = table.getElementsByTagName("tr");

    // Start the loop from the second row (index 1)
    for (var i = 1; i < rows.length; i++) {
        table.deleteRow(i); // Delete the row at index 1 repeatedly
    }
}

populateTableFromFirebase();



function filterTableRows() {
    var searchInput = document.getElementById('search');
    var table = document.getElementById('table');
    var rows = table.getElementsByTagName('tr');
    var filter = searchInput.value.toLowerCase();

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var rowDisplay = 'none'; // Default to hide the row

        for (var j = 0; j < cells.length; j++) {
            var cellText = cells[j].textContent.toLowerCase();
            if (cellText.includes(filter)) {
                rowDisplay = ''; // Display the row if a cell contains the input
                break;
            }
        }

        rows[i].style.display = rowDisplay;
    }
}

// Add an input event listener to the search bar
var searchInput = document.getElementById('search');
searchInput.addEventListener('input', filterTableRows);
