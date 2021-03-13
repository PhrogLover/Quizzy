import { useState, useEffect } from "react";

const useFetch = (url, refresher = null) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    console.log("out use Effect")
    useEffect(() => {
        console.log("in use Effect")
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
        .then(res => {
            if (!res.ok) {
                throw Error('Could not fetch the data for that resource.')
            }
            return res.json();
        })
        .then((data) => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch((err) => {
            if (err.name !== "AbortError") {
                setError(err.message);
                setIsPending(false);
            }
        })
        return () => abortCont.abort();
    }, [url, refresher]);

    return { data, isPending, error }
}

export default useFetch;