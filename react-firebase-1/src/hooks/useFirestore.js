import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite"
import { useState } from "react"
import { db, auth } from "../firebase"
import {nanoid} from "nanoid"
import { set } from "react-hook-form"

const useFirestore = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState({})


    const getData = async () => {
        console.log(auth)
        try {
            setLoading(prev => ({...prev, getData:  true}))
            const dataRef = collection(db, "URL")
            const q = query(dataRef, where("uid","==", auth.currentUser.uid)) //para filtrar
            const querySnapshot = await getDocs(q)
            const dataDb = querySnapshot.docs.map(doc => doc.data()) //{id: doc.id, ...doc.data()} por si queremos solo el id
            setData(dataDb)
        } catch (error) {
            console.log(error)
            setError(error.message)
            
        } finally {
            setLoading(prev => ({...prev, getData:  false}))
        }
    }

    //Agregar data
    const addData = async(url) => {
        try {
            setLoading(prev => ({...prev, addData:  true}))
            const newDoc = {
                enabled: true,
                nanoid: nanoid(4),
                origin: url,
                uid: auth.currentUser.uid
            }
            const docRef = doc(db, "URL", newDoc.nanoid)
            await setDoc(docRef, newDoc)
            setData([...data, newDoc])
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({...prev, addData:  false}))
        }

    }

    //delete data
    const deleteData = async (nanoid) => {
        try {
            setLoading(prev => ({...prev, [nanoid]:  true}))
            const docRef = doc(db, "URL", nanoid)
            await deleteDoc(docRef)
            setData(data.filter(item => item.nanoid !== nanoid))
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({...prev, [nanoid]:  false}))
        }
    } 
    
    //editar data 
    const updateData  = async(nanoid, newOrigin) => {
        try {
            setLoading(prev => ({...prev, [nanoid]:  true}))
            const docRef = doc(db, "URL", nanoid)
            await updateDoc(docRef, {origin: newOrigin}) 
            setData(data.map(item => item.nanoid === nanoid ? ({...item, origin: newOrigin}): item))
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(prev => ({...prev, [nanoid]:  false}))
        }
    }

    return {
        data, loading, error, getData, addData, deleteData, updateData

    }
}

export default useFirestore