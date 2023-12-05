import {useEffect, useState} from 'react'
import axios from "../api"

function useFetch(URL) {
    const [data, setData] = useState(null);
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios(URL)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [URL])

    return [data, isloading, error]
}

export default useFetch