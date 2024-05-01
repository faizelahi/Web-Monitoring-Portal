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

// Reference to the authentication service
const auth = firebase.auth();

// Reference to the police stations collection
const stationsRef = database.ref("police_station");



// Function to handle form submission
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get input values
    const district = document.getElementById("district").value;
    const tehsil = document.getElementById("tehsil").value;
    const station = document.getElementById("station").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validate password and confirm password match
    if (password !== confirmPassword) {
        document.getElementById("passwordError").style.display = "block";
        return;
    }

    // Sign up with email and password
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Registration successful, now store the data in the database
            const user = userCredential.user;
            const userId = user.uid;

            // Generate unique key
            const uniqueKey = generateUniqueKey();

            // Store user data in Firebase
            stationsRef.child(userId).set({
                district: district,
                tehsil: tehsil,
                station: station,
                email: email,
                password: password,
                uniqueKey: uniqueKey
            });

            // Redirect to welcome page with unique key
            window.location.href = "./welcome.html?key=" + uniqueKey;
        })
        .catch((error) => {
            // Handle registration errors
            console.error(error.message);
            // Display error message to user (e.g., show error div)
            document.getElementById("errorMessage").innerText = error.message;
        });
});
// Function to generate a unique key
function generateUniqueKey() {
  // Define the characters allowed in the key
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // Define the length range for the key (between 8 to 10 characters)
  const minLength = 8;
  const maxLength = 10;

  // Generate a random length between minLength and maxLength
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  let uniqueKey = '';

  // Generate the key by randomly selecting characters from the allowed characters
  for (let i = 0; i < length; i++) {
      uniqueKey += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return uniqueKey;
}
