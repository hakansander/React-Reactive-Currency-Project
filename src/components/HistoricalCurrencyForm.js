import React, { useState, useEffect } from 'react';
import {CurrencyDatePicker} from "./CurrencyDatePicker";
import {formatDate} from "../utils/DateFormatter";
import axios from 'axios';

export const HistoricalCurrencyForm = ({ addCurrency }) => {

    const [ baseInput, setBaseInput ] = useState('');
    const [ targetInput, setTargetInput ] = useState('');
    const [ rateInput, setRateInput ] = useState('');
    const [ currencyDate, setCurrencyDate] = useState(formatDate(new Date()));

    const [data, setData] = useState('');

    const handleBaseChange = (e) => {
        setBaseInput(e.currentTarget.value)
    }

    const handleTargetChange = (e) => {
        setTargetInput(e.currentTarget.value)
    }

    const handleRateChange = (e) => {
        setRateInput(e.currentTarget.value)
    }

    const handleCurrencyDateChange = (currentDate) => {
        let formattedDate = formatDate(currentDate);
        setCurrencyDate(formattedDate);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:8080/currency/${currencyDate}/${baseInput}?targetCurrencies=${targetInput}`)
            .then(response => {
                let a = response;
                console.log(data);
                let responseData = response.data.data;
                const rateTargetKey = Object.keys(responseData.rates).toString();
                setData({base: responseData.base, target: rateTargetKey, rate: responseData.rates[rateTargetKey]})
            })
            .catch(error => console.log(error));


/*        setBaseInput("");
        setTargetInput("");
        setRateInput("");*/
    }

    useEffect( () => {
        if(data !== '') {
            addCurrency(data);
        }
    }, [data])

    return (
        <form onSubmit={handleSubmit}>
            <input value={baseInput} type="text" onChange={handleBaseChange} placeholder="Enter base currency..."/>
            <input value={targetInput} type="text" onChange={handleTargetChange} placeholder="Enter target currency..."/>
            <input value={rateInput} type="text" onChange={handleRateChange} placeholder="Enter exchange rate..."/>
            <CurrencyDatePicker value={currencyDate} onCurrencyDateSelect={handleCurrencyDateChange} />
            <button>Submit</button>
        </form>
    );
};

