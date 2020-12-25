import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCtmZtZaUMhyN9sFXR6RxVZhDiKXpbuU_o",
  authDomain: "todoapp-7e193.firebaseapp.com",
  projectId: "todoapp-7e193",
  storageBucket: "todoapp-7e193.appspot.com",
  messagingSenderId: "288116258417",
  appId: "1:288116258417:web:b2813cc4f72e0c4393cdd0"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

export { db };