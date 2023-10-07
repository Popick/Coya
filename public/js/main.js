import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, push, child, update, onValue} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';// TODO: Add SDKs for Firebase products that you want to use

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


function addRequest() {
    window.location.href = 'add_request.html';
}

function addOffer() {
    window.location.href = 'add_offer.html';
}


 
function populateTableFromFirebase() {
    const db = getDatabase();
    const dbRefrequests = ref(db, 'requests');

    
    onValue(dbRefrequests, (snapshot) => {
        const data = snapshot.val();

        if (!data) {
            console.log("No data retrieved from Firebase");
            return;
        }

        const table = document.getElementById('requestTable').getElementsByTagName('tbody')[0];
        table.innerHTML = ""; // Clear existing rows

        for(let key in data) {
            const newRow = table.insertRow();
            newRow.insertCell(0).innerHTML = data[key].name;
            newRow.insertCell(1).innerHTML = data[key].contact_input;
            newRow.insertCell(2).innerHTML = data[key].location_input;
            newRow.insertCell(3).innerHTML = data[key].info_input;
            newRow.insertCell(4).innerHTML = data[key].active ? "כן" : "לא"; 
        }
    });



    const dbRefoffers = ref(db, 'offers');
    onValue(dbRefoffers, (snapshot) => {
        const data = snapshot.val();

        if (!data) {
            console.log("No data retrieved from Firebase");
            return;
        }

        const table = document.getElementById('offerTable').getElementsByTagName('tbody')[0];
        table.innerHTML = ""; // Clear existing rows

        for(let key in data) {
            const newRow = table.insertRow();
            newRow.insertCell(0).innerHTML = data[key].name;
            newRow.insertCell(1).innerHTML = data[key].contact_input;
            newRow.insertCell(2).innerHTML = data[key].location_input;
            newRow.insertCell(3).innerHTML = data[key].info_input;
            newRow.insertCell(4).innerHTML = data[key].active ? "כן" : "לא"; 
        }
    });
}




$(document).ready(function() {
    populateTableFromFirebase();
    $("#addR").click(addRequest);
    $("#addO").click(addOffer);



    var oTable = $("#offerTable");
    var rTable = $("#requestTable");

    oTable.css("display", "none");
    rTable.css("display", "table");

    $("#showO").click(function() {
        oTable.css("display", "table");
        rTable.css("display", "none");
    });
    $("#showR").click(function() {
        oTable.css("display", "none");
        rTable.css("display", "table");
    });
});

