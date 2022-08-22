import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import{useNavigate} from 'react-router-dom'




const Login = () => {

    const [email, setEmail] = useState('simon@test.com')
    const [password, setPassword] = useState('123123')
    
//Paso 1
    const {loginUser} = useContext(UserContext)
    
// IMPORTANTE EL NAVEGATE VA EN EL TRY DURAMOS AQUI UNA HORA VIENDO ESO
    const navegate = useNavigate()



// mismo evento del componente register solo cambia en el await por el loginUser que viene del componente provider
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log('loading...',email, password )
        
        try {
            await loginUser(email, password)
            navegate("/")
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="ingresa el email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="ingresa el password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">
                    Login
                </button>
            </form>
        </>
    )
}

export default Login

/*
aqui usamos el useNavigate que un elemento de react router dom que nos permite
llevar al usuario al momento de llevar al home al momento que que quiera acceder cambiando su estado de false a true
*/