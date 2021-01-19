import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDPSd3USsLW-eo6dU6JHiSMQnAu9za1Xzk",
  authDomain: "upload-project-267ab.firebaseapp.com",
  projectId: "upload-project-267ab",
  storageBucket: "upload-project-267ab.appspot.com",
  messagingSenderId: "624061771430",
  appId: "1:624061771430:web:1dbdbf796b530413f0ce67",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();

export { projectStorage };
