import React, { useEffect, useState } from 'react'

export const CurrencyList = () => {

    const [listening, setListening] = useState(false);
    const [currency, setCurrency] = useState(0);

    let eventSource = undefined;

    const currencyUrl = "http://localhost:8080/currency/hakan"

    useEffect(() => {
        if (!listening) {
            eventSource = new EventSource(currencyUrl);
            eventSource.onmessage = (event) => {
                const currency = JSON.parse(event.data);
                setCurrency(currency.rate)
            }
            eventSource.onerror = (err) => {
                console.error("EventSource failed:", err);
                eventSource.close();
            }
            setListening(true)
        }
        return () => {
            eventSource.close();
            console.log("event closed")
        }

    }, [])

    return (
        <div style={{ "marginTop": "20px", "textAlign": "center" }}>
            <p>{currency}</p>
        </div>
    )
}
