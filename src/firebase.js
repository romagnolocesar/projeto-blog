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

        //Referenciando a database para acessar em outros locais
        this.app = app.database();
   } 

   login(email, password){
       return app.auth().signInWithEmailAndPassword(email, password);
   }

    logOut(email, password){
        return app.auth().signOut();
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
        return app.auth().currentUser && app.auth().currentUser.email
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;
        }

        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
        .once('value')
        .then(callback);
    }

    newPost(autor, descricao, imagem, titulo){
        let posts = app.database().ref('posts');
        let key = posts.push().key;

       posts.child(key).set({
            autor: autor,
            descricao: descricao,
            imagem: imagem,
            titulo: titulo ,         
        })
        .then( (result) => {
            return result;
        })
        .catch((error) => {
            alert(error.message);
        });
    }
    
}

export default new Firebase();