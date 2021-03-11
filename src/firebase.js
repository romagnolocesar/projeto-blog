import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

    //Firebase Configurações
    let firebaseConfig = {
        apiKey: "AIzaSyCSmKMjLF8ziuj3sGXap36tsXHoOQeIPgM",
        authDomain: "reactapp-c2919.firebaseapp.com",
        projectId: "reactapp-c2919",
        storageBucket: "reactapp-c2919.appspot.com",
        messagingSenderId: "939382731975",
        appId: "1:939382731975:web:0b83e4c620cc60b5d4fae2"
    };

class Firebase{
   constructor(){
       // Inicializando Firebase
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }

        this.app = app.database();
   } 

   login(email, password){
       return app.auth().signInWithEmailAndPassword(email, password);
   }

   async register(nome, email, password){
       await app.auth().createUserWithEmailAndPassword(email, password);

       const uid = app.auth().currentUser.uid;

       return app.database().ref('usuarios').child(uid).set({nome: nome});
   }

   isInitialized(){
        return new Promise(resolve =>{
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email;
    }
}

export default new Firebase();