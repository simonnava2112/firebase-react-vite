import { useContext } from 'react';
import { UserContext } from "../context/UserProvider"
import { Navigate } from 'react-router-dom' //esto es componente que nos permite arrojar al usuario a una ruta protegida


const RequireAuth = ({children}) => {
    const {user} = useContext(UserContext)

    if(!user){
        return <Navigate to="/login" />
    }
    return children
}

export default RequireAuth

