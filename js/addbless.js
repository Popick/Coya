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
const app = firebase.initializeApp(firebaseConfig);
const textField = document.querySelector('input[name="name"]');
var hostageDB = firebase.database().ref("blessing/");


const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    // Prevent the default form submission.
    event.preventDefault();
    // save the current time 
    const pkey = Date.now()

    // create a new skeleton object
    var postData = {
        name: "",
        photourl: ""
    };

    // upload the photos to the database and wait for the upload to complete
    uploadPhotos(pkey, postData);

});


async function uploadPhotos(pkey) {
    // Get the photos from the form.
    const photos = document.querySelector('input[name="photos"]').files;
    const firebase = window.firebase;

    console.log('Uploading photo');
    // Upload each photo to Firebase Storage.
    for (const photo of photos) {
      // Create a reference to the photo.
      const photoRef = firebase.storage().ref('blessings/' + pkey);
        // Upload the photo to Firebase Storage.
      await photoRef.put(photo).then((snapshot) => {
        // Get the download URL of the photo.
        const photoUrl = snapshot.ref.getDownloadURL();
        // save to the skeleton
        photoUrl.then((url) => {
            console.log(url);
            if (getElementVal("name")===null){
                var Name = "אנונימי";
            }
            else{
                var Name = getElementVal("name").value;
            }
            var bless1 = {
                name: Name,
                URL: url
            };
            // save the links in the database
            writeDatabase(bless1);
        });
      });
    }
}


// a funcsion that write objects to the DB
async function writeDatabase(postData) {
    const db = firebase.database().ref("pending");
    const pushToDatabase = db.push();
    pushToDatabase.set(postData);
}


// return an element object for given id
function getElementVal(id) {
    return document.getElementById(id);
}


// Get references to the input and image elements
const imageUploadInput = document.getElementById("photos");
const imagePreview = document.getElementById("image-preview");

// Add an event listener to the file input
imageUploadInput.addEventListener("change", function () {
    const file = imageUploadInput.files[0]; // Get the selected file

    if (file) {
        // Create a URL for the selected image and set it as the src of the image element
        const imageURL = URL.createObjectURL(file);
        imagePreview.src = imageURL;
        imagePreview.style.display = "block"; // Set the display property to "block" to make it visible
    } else {
        // If no file is selected, clear the image preview
        imagePreview.src = "";
    }
});
