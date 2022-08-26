import { useContext} from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import FormError from "../components/FormError"
import FormInput from "../components/FormInput"

import { UserContext} from "../context/UserProvider"
import { erroresFirebase } from "../utils/erroesFirebase"
import formValidate from "../utils/formValidate"




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

//cosas de formValidate
const {required, patternEmail, minLength, validateTrim, validateEquals} = formValidate()

    // con este evento vamos hacer una funcion asynch
    const onSubmit = async({email, password}) => {
            try {
                await registerUser(email, password)
                navegate("/")
            } catch (error) {
                console.log(error.code)
                setError("firebase", {
                    message: erroresFirebase(error.code),
                })
                    /*switch(error.code){
                        case "auth/email-already-in-use":
                            console.log('Usuario ya registrado ')

                            break;
                            case "auth/invalid-email":
                                setError("firebase", {
                                    message: "Formato email no válido",
                                });
                                break;
                        default:
                            console.log('Ocurrio un error en el servidor')
                    } */
                }
            }


    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormError error={errors.firebase}/>
                <FormInput
                    type="email" 
                    placeholder="ingresa el email"
                    //con el require alli empezamos a trabajar con las validaciones
                    {...register("email", {
                        required
                    ,
                    pattern: patternEmail 
                })}
                >
                    <FormError error={errors.email}/>
                </FormInput>
                {
                    //los errores del usuarios
                    // esto funciona cuando el usuario deja el input email vacio errors.email && <p>{errors.email.message}</p>}
                }

                <FormInput
                    type="password" 
                    placeholder="ingresa el password"
                    //validacion de password con React-hook-form
                    {...register("password",{
                    minLength,
                    // REVISA EL formValidate.js 
                    validate: validateTrim
                    })}
                >
                    <FormError error={errors.password}/>
                </FormInput>
                
                {
                    //para manifestar la validacion 
                    // en los operadores ternario siempre tiene que existir el false y el true
                    //pero con && podemos hacer un if sin necesidad de colocar else (:)
                    //errors.password && errors.password.message
                }
                <FormInput
                    type="password" 
                    placeholder="repetir el password"
                    {...register("repassword",{
                        validate: validateEquals(getValues)
                    } )}                
                >
                    <FormError error={errors.repassword}/>
                </FormInput>
                {
                    //errors.repassword && <p>{errors.repassword.message}</p>
                }
                <button type="submit">
                    registrar
                </button>
            </form>
        </>
    )
}

export default Register