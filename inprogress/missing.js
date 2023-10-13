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


const db = getDatabase();
const refMissing = ref(db, 'Missing');

onValue(refMissing, (snapshot) => {
    const data = snapshot.val();
    console.log("data" + data);
    for (const uid in data) {
        const userData = data[uid];
        createCarousel(userData);
    }
});


function move(element, n) {
    const container = element.parentElement;
    const slideIndexAttr = container.getAttribute('data-slideindex');
    let slideIndex = parseInt(slideIndexAttr, 10);
    showSlide(container, slideIndex += n);
}

function showSlide(container, n) {
    const slides = container.querySelectorAll(".carousel img");
    if (n > slides.length) { n = 1 }
    if (n < 1) { n = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[n - 1].style.display = "block";
    container.setAttribute('data-slideindex', n);
}

// Initialize each carousel
document.querySelectorAll(".carousel-container").forEach(container => {
    showSlide(container, 1);
});




function createCarousel(data) {
    // Create the main carousel container
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';
    carouselContainer.setAttribute('data-slideindex', '1');

    // Create the image carousel
    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    data.images.forEach((imgSrc) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        carousel.appendChild(img);
    });
    carouselContainer.appendChild(carousel);

    // Add navigation arrows
    const leftArrow = document.createElement('span');
    leftArrow.className = 'arrow left-arrow';
    leftArrow.innerHTML = '&#10094;';
    leftArrow.onclick = function() { move(this, -1); };
    carouselContainer.appendChild(leftArrow);

    const rightArrow = document.createElement('span');
    rightArrow.className = 'arrow right-arrow';
    rightArrow.innerHTML = '&#10095;';
    rightArrow.onclick = function() { move(this, 1); };
    carouselContainer.appendChild(rightArrow);

    // Add details below the carousel
    const details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = `
        <p>Name: ${data.name}</p>
        <p>Phone: ${data.phone}</p>
        <p>Place: ${data.place}</p>
    `;
    carouselContainer.appendChild(details);

    // Append the carousel container to the main page container
    document.getElementById('carouselWrapper').appendChild(carouselContainer);
    
    // Initialize the carousel
    showSlide(carouselContainer, 1);
}

$(document).ready(function() {
    $('.left-arrow, .right-arrow').click(function() {
        const direction = $(this).data('direction'); // Get the direction from data-direction attribute
        move(this, direction);
    });
});