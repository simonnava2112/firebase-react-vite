import { useContext } from 'react'
import {Link, NavLink} from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import Button from './Button'

const Navbar = () => {

    const {user, signOutUser} = useContext(UserContext)


//con este evento cerramos sesion Nota: el async nos permite hacer la conexion con la api(firebase) 
    const handleClickLogOut = async() => {

        try {
            await signOutUser()
        } catch (error) {
            console.log(error)
        }

    }

    const classButtonGreen = "text-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    const classButtonRed = "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    
    return(
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to="/" className="flex items-center"><span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Login Web</span> </Link>
                    <div className="flex md:order-2">
                    {user ? (
                        <>
                        <NavLink to="/" className={classButtonGreen}>Inicio</NavLink>
                        <button onClick={handleClickLogOut} className={classButtonRed}>Cerrar </button>
                        </>
                        ) : (
                            <>
                                <NavLink className={classButtonGreen} to="/login">Login</NavLink>
                                
                                <NavLink to="/register" className={classButtonGreen}>Register</NavLink>
                            </>
                        )
                    }                    
                    </div>
                
            </div>


        </nav>
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