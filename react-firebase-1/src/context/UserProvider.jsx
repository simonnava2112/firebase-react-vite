import { createContext, useState } from "react"

//paso 1
export const UserContext = createContext()

const UserProvider = ({children}) => {

//paso 3
    const [user, setUser] = useState(false)

    return(
// paso 2
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider


/*
vamos al index para envolver los componentes que estan alli

este conext es un elemento que te va permitir ver los accesos y el alcance del usuario
*/