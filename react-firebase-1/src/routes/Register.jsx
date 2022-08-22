import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { UserContext} from "../context/UserProvider"




const Register = () => {

    const [email, setEmail] = useState('simon@test.com')
    const [password, setPassword] = useState('123123')

//el useNavigate es para empujar al usuario a algun lugar donde queremos que vaya luego que se register
// IMPORTANTE EL NAVEGATE VA EN EL TRY DURAMOS AQUI UNA HORA VIENDO ESO
const navegate = useNavigate()
    //este usecontext es importante para llamar estados desde otro componente
    const {registerUser} = useContext(UserContext)

    // con este evento vamos hacer una funcion asynch 
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log('loading...',email, password )
        

        try {
            await registerUser(email, password)
            navegate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1>Register</h1>
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
                    registrar
                </button>
            </form>
        </>
    )
}

export default Register