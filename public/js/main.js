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


function addRequest() {
    window.location.href = 'add_request.html';
}

function addOffer() {
    window.location.href = 'add_offer.html';
}


let posts = [];


 
function populateTableFromFirebase() {
    const db = getDatabase();
    const dbRefrequests = ref(db, 'accepted/requests');

    
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
            posts.push({name: data[key].name, contact: data[key].contact_input, place: data[key].location_input,
                info: data[key].info_input, element: newRow})
        }
    });



    const dbRefoffers = ref(db, 'accepted/offers');
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

