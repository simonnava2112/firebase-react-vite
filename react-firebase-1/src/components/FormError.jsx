//errores del formulario tanto del backend y el frontend
const FormError = ({error}) => {
    return (
        <>
            {
                error && <p>{error.message}</p>
            }
        </>
    )
} 

export default FormError;