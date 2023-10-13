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


let posts = [];


 
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
            const newRow = table.insertRow(0);
            newRow.insertCell(0).innerHTML = data[key].name;
            newRow.insertCell(1).innerHTML = data[key].contact_input;
            newRow.insertCell(2).innerHTML = data[key].location_input;
            newRow.insertCell(3).innerHTML = data[key].info_input;
            posts.push({name: data[key].name, contact: data[key].contact_input, place: data[key].location_input,
                info: data[key].info_input, element: newRow})
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
            const newRow = table.insertRow(0);
            newRow.insertCell(0).innerHTML = data[key].name;
            newRow.insertCell(1).innerHTML = data[key].contact_input;
            newRow.insertCell(2).innerHTML = data[key].location_input;
            newRow.insertCell(3).innerHTML = data[key].info_input;
            posts.push({name: data[key].name, contact: data[key].contact_input, place: data[key].location_input,
                info: data[key].info_input, element: newRow})
        }
    });
}



const searchInput = document.querySelector("[data-search]")


searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    posts.forEach(post => {
        const isVisible = post.name.toLowerCase().includes(value) ||
                          post.contact.toLowerCase().includes(value) ||
                          post.place.toLowerCase().includes(value) ||
                          post.info.toLowerCase().includes(value) 
        post.element.classList.toggle("hide", !isVisible)
    })
})




$(document).ready(function() {
    populateTableFromFirebase();
    $("#addR").click(addRequest);
    $("#addO").click(addOffer);



    var oTable = $("#offerTable");
    var rTable = $("#requestTable");
    var buttonOffers = $("#showO")
    var buttonRequests = $("#showR")

    oTable.css("display", "none");
    rTable.css("display", "table");

    $("#showO").click(function() {
        oTable.css("display", "table");
        rTable.css("display", "none");
        buttonOffers.css("background-color","#769FCD")
        buttonRequests.css("background-color","#B9D7EA")
    });
    $("#showR").click(function() {
        oTable.css("display", "none");
        rTable.css("display", "table");
        buttonOffers.css("background-color","#B9D7EA")
        buttonRequests.css("background-color","#769FCD")
    });
});

