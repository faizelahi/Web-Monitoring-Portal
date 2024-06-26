// login.js
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
const auth = firebase.auth();
const database = firebase.database();document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const uniqueKey = document.getElementById('uniqueKey').value;
  const errorMessage = document.getElementById('errorMessage');

  // Sanitize email, password, and uniqueKey if needed

  database.ref('police_station').orderByChild('email').equalTo(email).once('value')
    .then(function(snapshot) {
      if (snapshot.exists()) {
        let isKeyValid = false;
        snapshot.forEach(function(childSnapshot) {
          const userData = childSnapshot.val();
          if (userData.uniqueKey === uniqueKey) {
            isKeyValid = true;
            auth.signInWithEmailAndPassword(email, password)
              .then(function(userCredential) {
                errorMessage.innerText = ''; // Clear any previous error message
                window.location.href = 'main.html';
              })
              .catch(function(error) {
                displayErrorMessage(errorMessage, 'Login failed: ' + error.message); // Display error message
              });
          }
        });
        if (!isKeyValid) {
          displayErrorMessage(errorMessage, 'Invalid uniqueKey'); // Display error message
        }
      } else {
        displayErrorMessage(errorMessage, 'Email not found'); // Display error message
      }
    })
    .catch(function(error) {
      displayErrorMessage(errorMessage, 'Error checking uniqueKey: ' + error.message); // Display error message
    });
});

function displayErrorMessage(element, message) {
  element.innerText = message;
  element.style.display = 'block'; // Show the error message
  setTimeout(function() {
      element.style.display = 'none'; // Hide the error message after 3 seconds
        
  }, 3000);
}



 // login buton click event
 document.getElementById("registerButton").addEventListener("click", () => {
  // Redirect the user to the login page
  window.location.href = "register.html";
});

function validateForm() {
var email = document.getElementById('email').value;
var password = document.getElementById('password').value;
var uniqueKey = document.getElementById('uniqueKey').value;

// Email validation
var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(email)) {
  alert('Please enter a valid email address');
  return false;
}

// Password validation
if (password.length < 8) {
  alert('Password must be at least 8 characters long');
  return false;
}

// Unique key validation (you can add your own validation logic here)
if (uniqueKey.trim() === '') {
  alert('Please enter a unique key');
  return false;
}

// Form is valid, submit the form
return true;
}
