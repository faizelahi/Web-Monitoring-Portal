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

  // Reference to the Firebase Authentication
  const auth = firebase.auth();
  const db = firebase.database();
  
  // Login form submission
  document.getElementById("loginForm").addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission
  
      // Get user input values
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      try {
          // Authenticate user with email and password
          const userCredential = await auth.signInWithEmailAndPassword(email, password);
          const user = userCredential.user;
          console.log("User logged in:", user);
  
          // Check if the user exists in the police_stations table
          const snapshot = await db.ref("police_station").orderByChild("email").equalTo(email).once("value");
          if (snapshot.exists()) {
              // User exists in the police_stations table
              window.location.href = "/main.html"; // Redirect user to main.html
          } else {
              // User does not exist in the police_stations table
              alert("Login failed. Invalid email or password.");
          }
      } catch (error) {
          // Authentication failed
          console.error("Login error:", error.message);
          // Display error message to user, e.g., show an alert
          alert("Login failed. Invalid email or password.");
      }
  });