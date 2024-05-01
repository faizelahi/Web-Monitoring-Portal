const firebaseConfig = {
    apiKey: "AIzaSyAZeZP_JsHuMuJLd2AlMzomUkejSyhnBfM",
    authDomain: "crime-app-2.firebaseapp.com",
    databaseURL: "https://crime-app-2-default-rtdb.firebaseio.com",
    projectId: "crime-app-2",
    storageBucket: "crime-app-2.appspot.com",
    messagingSenderId: "734810485452",
    appId: "1:734810485452:web:0c4cc229c4d6a39445c869",
    measurementId: "G-5TQGFNXH4S"
  };

firebase.initializeApp(firebaseConfig);

// Reference to the database
const db = firebase.database();

// Reference to the current user
let currentUser;

// Function to retrieve data from Firebase Realtime Database

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Reference to the node containing the unique key
const keyRef = database.ref('uniqueKey');

// Fetch the unique key and display it
keyRef.once('value', function(snapshot) {
  const uniqueKey = snapshot.val();
  document.getElementById('uniqueKey').innerText = uniqueKey;
});

// Download button functionality
document.getElementById('downloadButton').addEventListener('click', function() {
  // Assuming the key is stored in a variable named uniqueKey
  const uniqueKey = document.getElementById('uniqueKey').innerText;

  // Perform download operation (e.g., create a text file containing the key)
  // Here's a basic example
  const element = document.createElement('a');
  const file = new Blob([uniqueKey], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = 'unique_key.txt';
  document.body.appendChild(element); // Required for this to work in Firefox
  element.click();
});

// Function to handle download button click
document.getElementById("downloadButton").addEventListener("click", () => {
    // Perform download action
    // For example, you can prompt the user to download the unique key as a file
});



// Check the authentication state when the page loads
checkAuthState();