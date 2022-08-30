import { useContext} from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import FormError from "../components/FormError"
import FormInput from "../components/FormInput"
import Title from "../components/Title"

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
                const {code, message} = erroresFirebase(error.code)
                setError(code, {message,})
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
            <Title text="Register" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email" 
                    placeholder="ingresa el email"
                    //con el require alli empezamos a trabajar con las validaciones
                    {...register("email", {
                        required
                        ,
                        pattern: patternEmail 
                    })}
                    label="Ingresa tu correo"
                    error={errors.email}
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
                    label="Ingresa el password"
                    error={errors.password}
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
                        validate: validateEquals(getValues("password"))
                    })}
                    label="Repite el password"
                    error={errors.repassword}
                >
                    <FormError error={errors.repassword}/>
                </FormInput>
                {
                    //errors.repassword && <p>{errors.repassword.message}</p>
                }
                <Button text="Registrase"/>
            </form>
        </>
    )
}

export default Register