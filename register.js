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
  const database = firebase.database();
  const auth = firebase.auth();
  const stationsRef = database.ref("police_station");
  
  const form = document.getElementById("registerForm");
  const errorMessage = document.getElementById("errorMessage");
  const passwordError = document.getElementById("passwordError");
  
  form.addEventListener("submit", async function(event) {
      event.preventDefault();
  
      const district = document.getElementById("district").value;
      const tehsil = document.getElementById("tehsil").value;
      const station = document.getElementById("station").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
  
      // Client-side form validation
      if (!email || !password || !confirmPassword || password !== confirmPassword) {
          errorMessage.innerText = "Please fill in all fields and make sure passwords match.";
          return;
      }
  
      try {
          // Create user account
          const userCredential = await auth.createUserWithEmailAndPassword(email, password);
          const user = userCredential.user;
  
          // Send email verification
          await user.sendEmailVerification();
          errorMessage.innerText = "Verification email sent. Please verify your email.";
  
          // Check if email is verified every second
          checkEmailVerification(user, district, tehsil, station, email, password);
      } catch (error) {
          console.error(error.message);
          errorMessage.innerText = error.message;
      }
  });
  
  function checkEmailVerification(user, district, tehsil, station, email, password) {
      const intervalId = setInterval(async () => {
          await user.reload();
          if (user.emailVerified) {
              clearInterval(intervalId); // Stop checking
              const userId = user.uid;
              const uniqueKey = generateUniqueKey();
  
              // Store user data in the database
              await stationsRef.child(userId).set({
                  district: district,
                  tehsil: tehsil,
                  station: station,
                  email: email,
                  password: hashPassword(password), // Hash password before storing
                  uniqueKey: uniqueKey
              });
  
              // Redirect to welcome page
              window.location.href = "./welcome.html?key=" + uniqueKey;
          }
      }, 500); // Check every second
  }
  
  function generateUniqueKey() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const minLength = 10;
      const maxLength = 12;
      const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
      let uniqueKey = '';
      for (let i = 0; i < length; i++) {
          uniqueKey += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return uniqueKey;
  }
  
  function hashPassword(password) {
      // Implement password hashing algorithm (e.g., bcrypt) before storing in the database
      // For demonstration purposes, a simple hashing function is used here (not secure for production)
      let hashedPassword = '';
      for (let i = 0; i < password.length; i++) {
          hashedPassword += password.charCodeAt(i).toString(16);
      }
      return hashedPassword;
  }
  
  // Add event listener for "Send Verification Email Again" button
  document.getElementById("sendVerificationEmail").addEventListener("click", async function() {
      const user = auth.currentUser;
      try {
          await user.sendEmailVerification();
          errorMessage.innerText = "Verification email sent. Please verify your email.";
      } catch (error) {
          console.error(error.message);
          errorMessage.innerText = error.message;
      }
  });
  
  // Display "Send Verification Email Again" button and hide "Verify Email First" message
  auth.onAuthStateChanged((user) => {
      if (user) {
          if (!user.emailVerified) {
              document.getElementById("sendVerificationEmail").style.display = "block";
              document.getElementById("verifyEmailFirst").style.display = "block";
          }
      }
  });