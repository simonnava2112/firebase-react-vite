import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import{useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form"
import { erroresFirebase } from "../utils/erroesFirebase"
import FormError from "../components/FormError"
import FormInput from "../components/FormInput"
import formValidate from "../utils/formValidate"




const Login = () => {
//Paso 1
    const {loginUser} = useContext(UserContext)
    
// IMPORTANTE EL NAVEGATE VA EN EL TRY DURAMOS AQUI UNA HORA VIENDO ESO
    const navegate = useNavigate()
//cosas de react hook form
const {register, handleSubmit, formState: {errors},  setError } = useForm()
//cosas de formValidate
const {required, patternEmail, minLength, validateTrim} = formValidate()


// mismo evento del componente register solo cambia en el await por el loginUser que viene del componente provider

const onSubmit = async({email, password}) => {
    try {
        await loginUser(email, password)
        navegate("/")
    } catch (error) {
        console.log(error.code)
        setError("firebase", {
            message: erroresFirebase(error.code),
        })

        }
    }



    return(
        <>
            <h1>Login</h1>
            <FormError error={errors.firebase}/>
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
                >
                    <FormError error={errors.email}/>
                </FormInput>
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