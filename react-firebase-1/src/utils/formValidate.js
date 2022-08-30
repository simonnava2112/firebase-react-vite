

const formValidate = () => {
    return {

        required: {
            value: true,
            message: 'Campo obligatorio'
        },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: 'Formato de email incorrecto'
        },
        minLength: {
            value: 6,     //cuantos campos necesitamos
            message: "Minimo 6 caracteres"
        },
        validateTrim: {
            trim: (v) => {
                if(!v.trim()) return " Por favor escribe bien el password!!"
                true
            }
        },
        validateEquals(value) {
            return {
                equals: v => v === value || "No coincide el password" ,  //Nota IMPORTANTE: ir a donde estan los elementos de useForm() y agregar getValues
            //message: "No coincide el password"
            }

        }

    }
}

export default formValidate