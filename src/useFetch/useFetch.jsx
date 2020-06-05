import {useState, useEffect} from 'react';

const useFetch = (url, defaultResponse) => {

    const [data, setData] = useState(defaultResponse)

    async function getDataFromApi(url) {
        try {
            const res = await fetch(url)
            const data = await res.json()

            setData({
                loading: false,
                data
            })

        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getDataFromApi(url)
    }, [url])

    return data

}

export default useFetch
