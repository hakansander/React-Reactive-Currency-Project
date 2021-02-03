import React, { useState } from 'react';
import ReactDatePicker from "react-datepicker";
import {CurrencyDatePicker} from "./CurrencyDatePicker";
import {formatDate} from "../utils/DateFormatter";

export const HistoricalCurrencyForm = ({ addCurrency }) => {

    const [ baseInput, setBaseInput ] = useState('');
    const [ targetInput, setTargetInput ] = useState('');
    const [ rateInput, setRateInput ] = useState('');
    const [ currencyDate, setCurrencyDate] = useState('');

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
        addCurrency({base: baseInput, target: targetInput, rate: rateInput});
        setBaseInput("");
        setTargetInput("");
        setRateInput("");
    }
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

