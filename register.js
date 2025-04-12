// Import the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKVcafRW6xzCdNFB813-qSwLAY8wPOoRI",
    authDomain: "login-k-7771d.firebaseapp.com",
    projectId: "login-k-7771d",
    storageBucket: "login-k-7771d.appspot.com",
    messagingSenderId: "456298554019",
    appId: "1:456298554019:web:0a4f285435b722b4eb1516"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Wait for DOM to load before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    
    // ✅ Signup Logic
    const signupBtn = document.getElementById('submit');
    if (signupBtn) {
        signupBtn.addEventListener('click', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const policyChecked = document.getElementById('policy').checked;

            if (!email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            if (!policyChecked) {
                alert("Please agree to the Terms & Conditions.");
                return;
            }

            signupBtn.disabled = true;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                alert("Account created successfully!");
                window.location.href = "index.html"; // ✅ Redirect after signup
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    alert("This email is already registered. Please log in.");
                } else if (error.code === 'auth/weak-password') {
                    alert("Password should be at least 6 characters.");
                } else {
                    alert(error.message);
                }
            } finally {
                signupBtn.disabled = false;
            }
        });
    } else {
        console.error("Signup button not found");
    }

    // ✅ Login Logic
    const loginBtn = document.querySelector('.form-box.login button');
    if (loginBtn) {
        loginBtn.addEventListener('click', async (event) => {
            event.preventDefault();

            const email = document.querySelector('.form-box.login input[type="text"]').value;
            const password = document.querySelector('.form-box.login input[type="password"]').value;

            if (!email || !password) {
                alert("Please enter email and password");
                return;
            }

            loginBtn.disabled = true;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                alert("Login successful!");
                window.location.href = "profile.html"; // ✅ Redirect after login
            } catch (error) {
                if (error.code === 'auth/user-not-found') {
                    alert("No user found with this email. Please sign up.");
                } else if (error.code === 'auth/wrong-password') {
                    alert("Incorrect password. Try again.");
                } else {
                    alert(error.message);
                }
            } finally {
                loginBtn.disabled = false;
            }
        });
    } else {
        console.error("Login button not found");
    }
});
