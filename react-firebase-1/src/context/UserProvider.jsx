import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase"

//paso 1
export const UserContext = createContext()

const UserProvider = ({children}) => {

//paso 3
    const [user, setUser] = useState(false)

//metodos de firebase auth

// con este metodo hacemos que usuario este en linea

//el useEffect nos permite ejecutar algo por cada renderizado que salga en nuestro sitio web o que este pendiente de ciertas cosas
    useEffect(() => {       
        const unsuscribe = onAuthStateChanged(auth, user => {
            console.log(user)
//con este if si el usuario esta en line arroja todo este objeto {email, photoURL, displayName, uid}
            if(user){
                const {email, photoURL, displayName, uid} = user
                setUser({email, photoURL, displayName, uid})
//en caso contrario el usuario pasa al estado null
            }else{
                setUser(null)
            }
        })
        return () => unsuscribe()
    }, [])

    const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password)

    const signOutUser = () => signOut(auth)



    return(
// paso 2
        <UserContext.Provider value={{user, setUser, registerUser, loginUser,signOutUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider


/*
vamos al index para envolver los componentes que estan alli

este conext es un elemento que te va permitir ver los accesos y el alcance del usuario

ahora vamos a crear los metodos para cargar los servicios de firebase auth


*/