import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, push, child, update, onValue } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';// TODO: Add SDKs for Firebase products that you want to use


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
var urlList = [];
var nameList = [];
var infoList = [];
var filterUrlList = [];
var filterNameList = [];
var filterInfoList = [];

function collectUrlsFromBranch() {
    const db = getDatabase();
    const dbRefBlessings = ref(db, 'blessings');
    onValue(dbRefBlessings, (snapshot) => {
        const data = snapshot.val();
        urlList = [];
        filterUrlList = [];
        if (!data) {
            console.log("No data retrieved from Firebase");
            return;
        }

        for (let key in data) {
            urlList.push(data[key].URL);
            nameList.push(data[key].name);
            infoList.push(data[key].info);
            filterUrlList.push(data[key].URL);
            filterNameList.push(data[key].name);
            filterInfoList.push(data[key].info);
        }
        urlList.reverse();
        nameList.reverse();
        infoList.reverse();
        filterUrlList.reverse();
        filterNameList.reverse();
        filterInfoList.reverse();

        console.log(urlList);
        displayImages();

    });
}

collectUrlsFromBranch();


var modalContent = document.querySelector('.modal-image-container');
var modalImage = document.getElementById('modalImage');

// Function to set the modal content size
function setModalContentSize(image) {
    modalContent.style.width = image.width + 'px';
    modalContent.style.height = image.height + 'px';
}

var imageContainer = document.getElementById('boxes');
// Function to display images from the URLs
function displayImages() {
    imageContainer.innerHTML = "";
    // Loop through the image URLs and create image elements inside a "box" div
    filterUrlList.forEach(function (imageUrl) {
        var box = document.createElement('div');
        box.className = 'box';

        var image = document.createElement('img');
        image.src = imageUrl;
        image.style.maxWidth = '100%'; // Adjust image width as needed

        box.appendChild(image);
        imageContainer.appendChild(box);


        const boxes = document.querySelectorAll('.box');
        // Add a click event listener to open the modal
        image.addEventListener('click', function (event) {
            const parentBox = image.parentElement;
            const index = Array.from(boxes).indexOf(parentBox); console.log('Clicked box index:', index);
            const textBox = document.getElementById("modal-text");
            textBox.innerHTML = "<h4>פורסם על ידי " + filterNameList[index] + "</h4><p>" + filterInfoList[index] + "</p>";
            var modal = document.getElementById('imageModal');
            modal.style.display = 'flex'; // Use flex for vertical and horizontal centering
            modalImage.src = imageUrl;
        });


    });

    // Close the modal when the 'x' is clicked
    var closeModal = document.getElementById('closeModal');
    closeModal.addEventListener('click', function () {
        var modal = document.getElementById('imageModal');
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside the specific area of the modal
    window.addEventListener('click', function (event) {
        var modal = document.getElementById('imageModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const boxesContainer = document.getElementById("boxes");
    const boxElements = boxesContainer.querySelectorAll(".box");
    const firstBoxIMG = boxElements[0].querySelector("img"); // Select the first box
    firstBoxIMG.onload = function() {
        firstBoxIMG.id = "moving-image";
    }

}

// Handle image load to set modal content size
modalImage.onload = function () {
    setModalContentSize("100%");
};




const searchInput = document.getElementById('search');
searchInput.addEventListener('input', filterImages);

// Function to filter images and descriptions based on user input
function filterImages() {
    console.log("FUCK HAMAS FUCK HAMAS FUCK HAMAS FUCK HAMAS FUCK HAMAS FUCK HAMAS");
    const searchTerm = searchInput.value.toLowerCase();
    console.log("search:" + searchTerm);
    filterUrlList = [];
    filterNameList = [];
    filterInfoList = [];

    for (let i = 0; i < urlList.length; i++) {
        if (infoList[i].toLowerCase().includes(searchTerm)) {
            filterUrlList.push(urlList[i]);
            filterInfoList.push(infoList[i]);
            filterNameList.push(nameList[i]);
            console.log(filterUrlList);
            console.log(filterInfoList);
            console.log(filterNameList);
        }
    }
    console.log("hiii");
    displayImages();
}

