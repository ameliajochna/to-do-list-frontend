import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "normalize.css";
import { UserProvider } from "./context/UserContext";

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC7JLQXq609pg8IVtGX_v_UhTYEGzbzeMI",
//   authDomain: "productivity-tasks-manager.firebaseapp.com",
//   projectId: "productivity-tasks-manager",
//   storageBucket: "productivity-tasks-manager.appspot.com",
//   messagingSenderId: "605566332131",
//   appId: "1:605566332131:web:808a855487ac78498869d6",
//   measurementId: "G-SZV6FKMVSV"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <App />
  </UserProvider>,
);
