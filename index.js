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
  };firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.database();
  
  // Handle form submission
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const uniqueKey = document.getElementById('uniqueKey').value;
  
    // Check if the uniqueKey is correct for the given email
    database.ref('police_station').orderByChild('email').equalTo(email).once('value')
      .then(function(snapshot) {
        if (snapshot.exists()) {
          snapshot.forEach(function(childSnapshot) {
            const userData = childSnapshot.val();
            if (userData.uniqueKey === uniqueKey) {
              // Sign in with email and password
              auth.signInWithEmailAndPassword(email, password)
                .then(function(userCredential) {
                  alert('Login successful!');
                  // Redirect to main.html
                  window.location.href = 'main.html';
                })
                .catch(function(error) {
                  alert('Login failed: ' + error.message);
                });
            } else {
              alert('Invalid uniqueKey');
            }
          });
        } else {
          alert('Email not found');
        }
      })
      .catch(function(error) {
        alert('Error checking uniqueKey: ' + error.message);
      });
  });