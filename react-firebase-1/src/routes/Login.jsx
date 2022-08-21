import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate} from 'react-router-dom'

const Login = () => {
    
//Paso 1
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const handleClick = () => {
        setUser(true)
        navigate('/')
    }


    return(
        <>
            <h1>Login</h1>
            <h2>
                {
                    user ? 'en linea' : 'offline'
                }
            </h2>
            <button onClick={handleClick}>tocar</button>
        </>
    )
}

export default Login

/*
aqui usamos el useNavigate que un elemento de react router dom que nos permite
llevar al usuario al momento de llevar al home al momento que que quiera acceder cambiando su estado de false a true
*/