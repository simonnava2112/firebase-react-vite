import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { UserContext} from "../context/UserProvider"




const Register = () => {

    //const [email, setEmail] = useState('simon@test.com')
    //const [password, setPassword] = useState('123123')

//el useNavigate es para empujar al usuario a algun lugar donde queremos que vaya luego que se register
// IMPORTANTE EL NAVEGATE VA EN EL TRY DURAMOS AQUI UNA HORA VIENDO ESO
const navegate = useNavigate()
    //este usecontext es importante para llamar estados desde otro componente
    const {registerUser} = useContext(UserContext)

//cosas de react hook form
    const {register, handleSubmit, formState: {errors}, getValues, setError } = useForm()

    // con este evento vamos hacer una funcion asynch
    const onSubmit = async({email, password}) => {
            try {
                await registerUser(email, password)
                navegate("/")
            } catch (error) {
                console.log(error)
                    switch(error.code){
                        case "auth/email-already-in-use":
                            console.log('Usuario ya registrado ')
                            setError("email", {
                                message: "Email already in use"
                            })
                            break;
                            case "auth/invalid-email":
                                setError("email", {
                                    message: "Formato email no válido",
                                });
                                break;
                        default:
                            console.log('Ocurrio un error en el servidor')
                    }
                }
            }


    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="email" 
                    placeholder="ingresa el email"
                    //con el require alli empezamos a trabajar con las validaciones
                    {...register("email", {
                        required: {
                        value: true,
                        message: 'Campo obligatorio'
                    },
                    pattern: {
                        value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                        message: 'Formato de email incorrecto'
                    }
                })}
                />
                {
                    //los errores del usuarios
                    // esto funciona cuando el usuario deja el input email vacio
                    errors.email && <p>{errors.email.message}</p>
                    
                }
                <input 
                    type="password" 
                    placeholder="ingresa el password"
                    //validacion de password con React-hook-form
                    {...register("password",{
                        minLength: {
                            value: 6,     //cuantos campos necesitamos
                            message: "Minimo 6 caracteres"
                        },
                        validate: {
                            trim: (v) => {
                                if(!v.trim()) return "escribe bien el password!!"
                                true
                            }
                        }
                    })}
                />
                {
                    //para manifestar la validacion 
                    // en los operadores ternario siempre tiene que existir el false y el true
                    //pero con && podemos hacer un if sin necesidad de colocar else (:)
                    errors.password && errors.password.message
                }
                <input 
                    type="password" 
                    placeholder="repetir el password"
                    {...register("repassword",{
                        validate: {
                            equals: v => v === getValues("password") || "No coincide el password" ,  //Nota IMPORTANTE: ir a donde estan los elementos de useForm() y agregar getValues
                            //message: "No coincide el password"
                        }
                    } )}
                />
                {
                    errors.repassword && <p>{errors.repassword.message}</p>
                }
                <button type="submit">
                    registrar
                </button>
            </form>
        </>
    )
}

export default Register