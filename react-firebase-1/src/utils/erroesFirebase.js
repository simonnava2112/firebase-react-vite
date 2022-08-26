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
            return "Email already in use";

            case "auth/invalid-email":
                /*setError("firebase", {
                    message: "Formato email no válido",
                });
                break;
                */
                return "Formato email no válido";

        default:
            return 'Ocurrio un error en el servidor'
            //console.log('Ocurrio un error en el servidor')
    }
}