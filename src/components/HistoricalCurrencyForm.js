import React, { useState, useEffect } from 'react';
import {CurrencyDatePicker} from "./CurrencyDatePicker";
import {formatDate} from "../utils/DateFormatter";
import axios from 'axios';
import "./HistoricalCurrencyForm.css";

import currencySymbols from "../../src/currencySymbols.json";

export const HistoricalCurrencyForm = ({ addCurrency }) => {
    const [ baseInput, setBaseInput ] = useState('USD');
    const [ targetInput, setTargetInput ] = useState('TRY');
    const [ rateInput, setRateInput ] = useState('');
    const [ currencyDate, setCurrencyDate] = useState(formatDate(new Date()));

    const [data, setData] = useState(null);

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

        axios.get(`https://currency-app-spring-boot.herokuapp.com/currency/${currencyDate}/${baseInput}?targetCurrencies=${targetInput}`)
            .then(response => {
                let responseData = response.data.data;
                const rateTargetKey = Object.keys(responseData.rates).toString();
                setData(
                    {
                            base: responseData.base,
                            target: rateTargetKey,
                            rate: responseData.rates[rateTargetKey],
                            amount: rateInput,
                            date: currencyDate
                          }
                )
            })
            .catch(error => console.log(error));
    }

    useEffect( () => {
        if(data !== null) {
            addCurrency(data);
        }
    }, [data])

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <span id={"sourceCurrencyText"}> Select Source Currency <i className='fas fa-angle-double-right'></i> </span>

                <select onChange={handleBaseChange}>
                        {currencySymbols.map(currency => (
                            <option key={currency.symbol} value={currency.symbol}>
                                {currency.symbol}
                            </option>
                        ))}

                </select>
            </div>

            <div>
                <span id={"sourceCurrencyDate"}>Select the date of currency transaction <i className='fas fa-angle-double-right'></i> </span>
                <CurrencyDatePicker value={currencyDate} onCurrencyDateSelect={handleCurrencyDateChange} />
            </div>

            <div>
                <span id={"sourceCurrencyAmount"}>Enter the amount of {baseInput} that you bought <i className='fas fa-angle-double-right'></i>  </span>
                <input value={rateInput} type="text" onChange={handleRateChange} placeholder="Enter amount"/>
            </div>

            <button id={"historicalFormSubmitButton"}>Submit</button>

        </form>
    );
};

