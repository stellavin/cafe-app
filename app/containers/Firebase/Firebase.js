import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyASmBLEF37rRYXTmvV_nj9mdy3f2rY-nTg",
    authDomain: "test-d696e.firebaseapp.com",
    databaseURL: "https://test-d696e.firebaseio.com",
    projectId: "test-d696e",
    storageBucket: "test-d696e.appspot.com",
    messagingSenderId: "389465514803",
    appId: "1:389465514803:web:e1abb4bbf0bfa044"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;