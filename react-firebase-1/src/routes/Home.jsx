
import { useState } from "react"
import { useEffect } from "react"
import Button from "../components/Button"
import Title from "../components/Title"
import useFirestore from "../hooks/useFirestore"

const Home = () => {

    const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore()
    const [text, setText] = useState('')
    const [newOriginsID, setNewOriginsID] = useState()

    useEffect(() => {
        console.log('getData')
        getData()
    },[])

    if(loading.getData) return <p>Loading data getData...</p>
    if(error) return <p>{error}</p>

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        if(newOriginsID){
            await updateData(newOriginsID, text)
            setNewOriginsID('')
            setText('')
            return
    }
        await addData(text)
        setText('')

    }   

    const handleClickDelete = async(nanoid) => {
        await deleteData(nanoid)
    }

    const handleClickEdit = (item) => {
        setText(item.origin)
        setNewOriginsID(item.nanoid)

    }

    return(
        <>
            <Title text="Home"/>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Ingresa la Url"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
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
                        <p>{item.nanoid}</p>
                        <p>{item.origin}</p>
                        <p>{item.uid}</p>
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
                ))
            }
        </>
    )
}

export default Home