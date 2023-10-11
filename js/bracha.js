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

function collectUrlsFromBranch() {
    const db = getDatabase();
    const dbRefBlessings = ref(db, 'pending');
    onValue(dbRefBlessings, (snapshot) => {
        const data = snapshot.val();
        urlList = [];
        if (!data) {
            console.log("No data retrieved from Firebase");
            return;
        }

        for (let key in data) {
            urlList.push(data[key].URL);
        }
        console.log(urlList);
        displayImages();

    });
}

collectUrlsFromBranch();

// function displayImages() {
//     var imageContainer1 = document.getElementById('boxes');
//     imageContainer1.innerHTML = "";
//     // Loop through the image URLs and create image elements inside a "box" div
//     urlList.forEach(function (imageUrl) {
//         var box = document.createElement('div');
//         box.className = 'box';
//         box.tabIndex = 0;

//         var image = document.createElement('img');

//         image.style.maxWidth = '100%'; // Adjust image width as needed


//         image.addEventListener('click', function () {
//             var modal = document.getElementById('imageModal');
//             var modalImage = document.getElementById('modalImage');
  
//             modal.style.display = 'block';
//             modalImage.src = imageUrl;
//           });

//         // Append the image to the "box" div, and then the "box" div to the container
//         box.appendChild(image);
//         imageContainer1.appendChild(box);
//     });

//      // Close the modal when the 'x' is clicked
//      var closeModal = document.getElementById('closeModal');
//      closeModal.addEventListener('click', function () {
//        var modal = document.getElementById('imageModal');
//        modal.style.display = 'none';
//      });

//      // Close the modal when clicking outside the specific area of the modal
//      window.addEventListener('click', function (event) {
//        var modal = document.getElementById('imageModal');
//        if (event.target === modal) {
//          modal.style.display = 'none';
//        }
//      });

// }


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

  // Loop through the image URLs and create image elements inside a "box" div
  urlList.forEach(function (imageUrl) {
    var box = document.createElement('div');
    box.className = 'box';

    var image = document.createElement('img');
    image.src = imageUrl;
    image.style.maxWidth = '100%'; // Adjust image width as needed

    // Add a click event listener to open the modal
    image.addEventListener('click', function () {
      var modal = document.getElementById('imageModal');
      modal.style.display = 'flex'; // Use flex for vertical and horizontal centering
      modalImage.src = imageUrl;
    });

    // Append the image to the "box" div, and then the "box" div to the container
    box.appendChild(image);
    imageContainer.appendChild(box);
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
