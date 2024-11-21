import { useState, useEffect, useRef } from "react"

export function useFetch(initialUrl) {
    const urlRef = useRef(initialUrl)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState([])

    const fetchData = async () => {
        setError('')
        setIsLoading(true)
        try {
            await fetch(urlRef.current).then(res => res.json()).then(data => setData(data))
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }

    const refetch = async (options) => {
        setError('')
        setIsLoading(true)
        try {
            await fetch(`${urlRef.current}?_limit=${options.params._limit}`).then(res => res.json()).then(data => setData(data))
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
        return () => setError('')
    }, [urlRef.current])

    return {
        data,
        isLoading,
        error,
        refetch
    }
}