import React, { useState } from 'react';

export const HistoricalCurrencyForm = ({ addCurrency }) => {

    const [ baseInput, setBaseInput ] = useState('');
    const [ targetInput, setTargetInput ] = useState('');
    const [ rateInput, setRateInput ] = useState('');

    const handleBaseChange = (e) => {
        setBaseInput(e.currentTarget.value)
    }

    const handleTargetChange = (e) => {
        setTargetInput(e.currentTarget.value)
    }

    const handleRateChange = (e) => {
        setRateInput(e.currentTarget.value)
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
            <button>Submit</button>
        </form>
    );
};

