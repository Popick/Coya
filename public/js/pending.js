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
var keyList = [];

function collectUrlsFromBranch() {
    const db = getDatabase();
    const dbRefBlessings = ref(db, 'pending');
    onValue(dbRefBlessings, (snapshot) => {
        const data = snapshot.val();
        urlList = [];
        nameList = [];
        infoList = [];
        keyList = [];
        if (!data) {
            console.log("No data retrieved from Firebase");
            return;
        }

        for (let key in data) {
            urlList.push(data[key].URL);
            nameList.push(data[key].name);
            infoList.push(data[key].info);
            keyList.push(key);
        }
        urlList.reverse();
        nameList.reverse();
        infoList.reverse();
        keyList.reverse();

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

// Function to display images from the URLs
function displayImages() {
    var imageContainer = document.getElementById('boxes');
    imageContainer.innerHTML = "";
    // Loop through the image URLs and create image elements inside a "box" div
    urlList.forEach(function (imageUrl) {
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
            textBox.innerHTML = "פורסם על ידי "+ nameList[index] + "<br>" + infoList[index];
            var modal = document.getElementById('imageModal');
            modal.style.display = 'flex'; // Use flex for vertical and horizontal centering
            modalImage.src = imageUrl;
            modalImage = resizeImage(modalImage);            
            var approveButton = document.getElementById("approve-button");
            approveButton.onclick = function(){
                const bless1 = {
                    name: nameList[index],
                    URL: urlList[index],
                    info: infoList[index]
                };
                writeDatabase(bless1);
                var key = keyList[index];
                deleteDataFromDatabase(key);
                modal.style.display = 'none';
            }
            var declineButton = document.getElementById("reject-button");
            declineButton.onclick = function(){
                var key = keyList[index];
                deleteDataFromDatabase(key);
                modal.style.display = 'none';

            }


        });

        // Append the image to the "box" div, and then the "box" div to the container
        
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
}

// Handle image load to set modal content size
modalImage.onload = function () {
    setModalContentSize("100%");
};


function resizeImage(image){
    if (image.width != 1024) {
        console.log(image.height + " / " + image.width);
        var aspectRatio = image.height / image.width;
        image.width = 1024;
        image.height = 1024 * aspectRatio;
      }

      return image;
}

// a funcsion that write objects to the DB
async function writeDatabase(postData) {
    const db = getDatabase();
    const newPostKey = push(child(ref(db), 'no_key')).key;
    const updates = {};
    updates['/approved/' + newPostKey] = postData;
    update(ref(db), updates)
        .then(() => {
            console.log("עבר בהצלחה");
        })
        .catch(error => {
            console.log("סליחה נתקלנו בבעיות 😞");
        });
}

function deleteDataFromDatabase(key) {
    const db = getDatabase();
    const updates = {};
    updates['/pending/' + key] = null;

    // Update database and show alert once data is uploaded
    update(ref(db), updates)
        .then(() => {
            console.log("נמחק בהצלחה");
        })
        .catch(error => {
            console.log("סליחה נתקלנו בבעיות 😞");
        });

}