import * as firebase from 'firebase';




  var firebaseConfig = {
    apiKey: "AIzaSyB0w-iT2B2NPZfGWYeYKYBekAzw4ttgmTI",
    authDomain: "food-panda-pakistan.firebaseapp.com",
    databaseURL: "https://food-panda-pakistan.firebaseio.com",
    projectId: "food-panda-pakistan",
    storageBucket: "food-panda-pakistan.appspot.com",
    messagingSenderId: "6499340953",
    appId: "1:6499340953:web:5412352501f99c3d"
  };


  export default firebase.initializeApp(firebaseConfig);