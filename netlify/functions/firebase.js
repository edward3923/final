const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyCKJoxlZ3hViRPGjaw3JAagojoRHD4GfQc",
  authDomain: "kiei-451-final-b3fd4.firebaseapp.com",
  projectId: "kiei-451-final-b3fd4",
  storageBucket: "kiei-451-final-b3fd4.appspot.com",
  messagingSenderId: "886508661968",
  appId: "1:886508661968:web:f5b8e7f6be2b9e7e0942d5"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase