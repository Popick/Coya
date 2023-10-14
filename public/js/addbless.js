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


function resizeImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const maxWidth = 728;
          const maxHeight = 728;
          let newWidth = img.width;
          let newHeight = img.height;


          if (img.width > maxWidth) {
              newWidth = maxWidth;
              newHeight = (img.height * maxWidth) / img.width;
          }
      
          if (newHeight > maxHeight) {
              newHeight = maxHeight;
              newWidth = (img.width * maxHeight) / img.height;
          }
          
        //   console.log("og " + img.width + " " + img.height);
        //   console.log("new " + newWidth);
        //   console.log("new " + newHeight);
      
          canvas.width = newWidth;
          canvas.height = newHeight;
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
      
          canvas.toBlob((blob) => {
              resolve(blob);
            }, 'image/jpeg');
        };
        img.src = event.target.result;
      };
  
      reader.readAsDataURL(file);
    });
}


async function uploadPhotos(pkey) {

    toggleRotatingCircle();
    // Get the photos from the form.
    const files = document.querySelector('input[name="photos"]').files;
    const firebase = window.firebase;

    console.log('Uploading photo');
    // Upload each photo to Firebase Storage.
    for (const file of files) {
        const resizedImageBlob = await resizeImage(file);
    
        const photoRef = firebase.storage().ref('blessings/' + pkey);
    
        // Upload the resized photo to Firebase Storage.
        await photoRef.put(resizedImageBlob).then(async (snapshot) => {
          // Get the download URL of the resized photo.
          const photoUrl = await snapshot.ref.getDownloadURL();
    
          // Save to the skeleton
          if (getElementVal("name").value === "") {
            var Name = "אנונימי";
          } else {
            var Name = getElementVal("name").value;
          }
    
          if (getElementVal("info").value === "") {
            var Info = "";
          } else {
            var Info = getElementVal("info").value;
          }
    
          const bless1 = {
            name: Name,
            URL: photoUrl,
            info: Info
          };
    
          // Save the links in the database
          writeDatabase(bless1);
        });
    }
    toggleRotatingCircle();
}


// a funcsion that write objects to the DB
async function writeDatabase(postData) {
    const db = firebase.database().ref("blessings");
    const pushToDatabase = db.push();
    pushToDatabase.set(postData);
    alert("ברכתכם התקבלה בהצלחה! תודה רבה!");
    window.close();
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
        console.log("image");

    } else {
        // If no file is selected, clear the image preview
        imagePreview.src = "";
    }
});


function toggleRotatingCircle() {
    var rotatingCircle = document.getElementById("rotatingCircle");
    var computedStyle = window.getComputedStyle(rotatingCircle);

    if (computedStyle.display === "none") {
        rotatingCircle.style.display = "block";
    } else {
        rotatingCircle.style.display = "none";
    }
}