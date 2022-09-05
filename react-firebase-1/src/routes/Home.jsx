
import { useState } from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import Button from "../components/Button"
import Card from "../components/Card"
import FormError from "../components/FormError"
import FormInput from "../components/FormInput"
import Title from "../components/Title"
import useFirestore from "../hooks/useFirestore"
import formValidate from "../utils/formValidate"

const Home = () => {

    const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore()
    const [newOriginsID, setNewOriginsID] = useState()
    const {required, patternURL } = formValidate()
    const {register, handleSubmit, formState: {errors},  setError, resetField, setValue } = useForm()

    useEffect(() => {
        console.log('getData')
        getData()
    },[])

    if(loading.getData) return <p>Loading data getData...</p>
    if(error) return <p>{error}</p>

    const onSubmit = async({url}) => {
        try {
        if(newOriginsID){
            await updateData(newOriginsID, url)
            setNewOriginsID('')
        } else {
            await addData(url)
        }            
        } catch (error) {
            const {code, message} = erroresFirebase(error.code);
            setError(code, {message})
        }

    resetField('url')
    }   

    const handleClickDelete = async(nanoid) => {
        await deleteData(nanoid)
    }

    const handleClickEdit = (item) => {
        setNewOriginsID(item.nanoid)
        setValue('url', item.origin);

    }

    return(
        <>
            <Title text="Home"/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="text" 
                    placeholder="ingresa el url"
                    //con el require alli empezamos a trabajar con las validaciones
                    {...register("url", {
                        required
                    ,
                    pattern: patternURL 
                })}
                label="Ingresa email"
                error={errors.url}
                >
                    <FormError error={errors.url}/>
                </FormInput>
                {
                    newOriginsID ? (
                        <Button 
                            text="editar"
                            type="submit"
                            color="red"
                            loading={loading.updateData}
                        />
                    ) : (
                        <Button 
                            text="add"
                            type="submit"
                            loading={loading.addData}/>
                    )
                }
                
            </form>
            {
                data.map(item => (
                    <div key={item.nanoid}>
                        <Card 
                            p1={item.nanoid}
                            p2={item.origin}
                            />
                        <div className="flex space-x-2">
                                <Button 
                                    text="Delete" 
                                    type="button" 
                                    color="red"
                                    loading={loading[item.nanoid]}
                                    onClick={() => handleClickDelete(item.nanoid)} 
                                    />
                                <Button 
                                    text="Edit" 
                                    type="button" 
                                    color="blue"
                                    loading={loading[item.nanoid]}
                                    onClick={() => handleClickEdit(item)} 
                                    />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Home