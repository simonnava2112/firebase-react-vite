import {getAuth} from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDunvzk8am84fIEpZXNwqQY7-iRWS8tX18",
    authDomain: "react-2022-21.firebaseapp.com",
    projectId: "react-2022-21",
    storageBucket: "react-2022-21.appspot.com",
    messagingSenderId: "517392640778",
    appId: "1:517392640778:web:efaca4797bf8423d6e68f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth };

/*
Instalar firebase 
    1- Despues de haber creado el proyecto en firebase.com y habilitar la autentificacion
    copiamos y pegamos el codigo que nos arroja firebase.com

    2- llamamos los servicio de getAuth proyecto
        - lo importamos.
        - creamos un const que se llame auth y llamamos el metodo con la instacia de initializeApp
        - exportamos auth

*/ 