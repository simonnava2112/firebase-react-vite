import { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

const Navbar = () => {

    const {user, setUser} = useContext(UserContext)

    return(
        <div>
            {user ? (
                <>
                <NavLink to="/">Inicio</NavLink>
                <button onClick={() => setUser(false)} >Cerrar </button>
                </>
                ) : (
                    <NavLink to="/login">Login</NavLink>
                )

            }

        </div>
    )
}

export default Navbar

/*
React router dom.
#Paso 1
Hacemos la importacion de Link de react router dom
colocamos el atributo (to="envuelve la ruta")

cumple la misma funcion que el ancord (a) pero en ves de (href) es (to).

NavLink 
    es un modulo de react router dom que tiene la misma accion que un <Link>
    la unica diferencia es que tiene un (class= Active) que le permite al usuario saber 
    en que ruta esta alojado.

#Paso 2

    hacemos un const llamando a los estados de UserProvider{user, setUser} luego
    luego usamos useContext y llamamos(UserContext) de la carpeta context.
    
    creamos una condicional con los diferentes estado de true o false y probamos el cambio
    de estado.


*/