// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // Add other Firebase config properties if you're using them (e.g., storageBucket, messagingSenderId, appId)
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Contact form submit
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMessage");
form.addEventListener("submit", e=>{
  e.preventDefault();
  const data = {
    name: form[0].value,
    email: form[1].value,
    message: form[2].value,
    timestamp: firebase.firestore.FieldValue.serverTimestamp() // Use server timestamp for accuracy
  };
  db.collection("contacts").add(data)
    .then(()=>{ msg.innerText="Message sent successfully!"; form.reset(); })
    .catch((error)=>{ 
      msg.innerText="Error sending message: " + error.message; 
      console.error("Error writing document: ", error);
    });
});