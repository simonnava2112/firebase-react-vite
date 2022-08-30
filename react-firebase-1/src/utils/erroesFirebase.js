//Para almacenar todos los errores del backend
export const erroresFirebase = (code) => {
    switch(code){
        case "auth/email-already-in-use":
            /*
            console.log('Usuario ya registrado ')
            setError("firebase", {
                message: "Email already in use"
            })
            break;
            */
        return {
            code : "email",
            message: "  Email already in use"
        };

            case "auth/invalid-email":
                /*setError("firebase", {
                    message: "Formato email no válido",
                });
                break;
                */
                return {
                    code : "email",
                    message: "  Formato email no valido"
                };

            //usuario no registrado
            case "auth/user-not-found":
                return {
                    code : "password",
                    message: "  Usuario no encotrado"
                };
            
            //password incorrecto
            case "auth/wrong-password":
                return {
                    code : "password",
                    message: "  Password incorrecto"
                };

        default:
            return ' Ocurrio un error en el servidor'
            //console.log('Ocurrio un error en el servidor')
    }
}