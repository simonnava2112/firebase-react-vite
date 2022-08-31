import { collection, getDocs, query, where } from "firebase/firestore/lite"
import { useEffect, useState } from "react"
import { db } from "../firebase"


const useFirestore = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log('getData')
        getData()
    },[])

    const getData = async () => {
        try {
            setLoading(true)
            const dataRef = collection(db, "URL")
            const q = query(dataRef, where("uid","==", "a4zl5gYCsTX32nmaIdP6PmHaakW2")) //para filtrar
            const querySnapshot = await getDocs(q)
            const dataDb = querySnapshot.docs.map(doc => doc.data()) //{id: doc.id, ...doc.data()} por si queremos solo el id
            setData(dataDb)
        } catch (error) {
            console.log(error)
            setError(error.message)
            
        } finally {
            setLoading(false)
        }
    }

    return {
        data, loading, error

    }
}

export default useFirestore