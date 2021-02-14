import React, {useEffect, useState} from 'react';
import {Currency} from "./Currency";
import {HistoricalCurrencyForm} from "./HistoricalCurrencyForm";
import axios from "axios";
import {formatDate} from "../utils/DateFormatter";

export const HistoricalCurrencyTable = () => {
    const [currencyList, setCurrencyList] = useState('');
    const [currentExchangeValues, setCurrentExchangeValues] = useState(null);

    //TO DO: Delete the states if the variables will remain constant

    const [ baseInput, setBaseInput ] = useState( 'TRY');
    const [ targetInput, setTargetInput ] = useState('EUR,USD');
    const [ currencyDate, setCurrencyDate] = useState(formatDate(new Date()));

    const addCurrency = inputCurrency => {
        setCurrencyList(prevCurrencies => [
            ...prevCurrencies, { id: currencyList.length + 1, ...inputCurrency }
        ]);
    }

    const removeCurrency = index => {
        const newCurrencyList = [...currencyList];
        newCurrencyList.splice(index, 1);
        setCurrencyList(newCurrencyList);
    };

    useEffect( () => {
        axios.get(`https://currency-app-spring-boot.herokuapp.com/currency/${currencyDate}/${baseInput}?targetCurrencies=${targetInput}`)
            .then(response => {
                let responseData = response.data.data;

                setCurrentExchangeValues(
                    {
                        base: responseData.base,
                        rates: responseData.rates,
                        date: currencyDate
                    }
                );

                console.log(currentExchangeValues);

            }).catch(error => console.log(error));
    }, [])


    const getCurrentExchangeValues = () => {
            axios.get(`https://currency-app-spring-boot.herokuapp.com/currency/${currencyDate}/${baseInput}?targetCurrencies=${targetInput}`)
                .then(response => {
                    let responseData = response.data.data;
                    const rateTargetKey = Object.keys(responseData.rates).toString();
/*                    setCurrentExchangeValues(
                        {
                            base: responseData.base,
                            target: rateTargetKey,
                            rate: responseData.rates[rateTargetKey],
                            amount: rateInput,
                            date: currencyDate
                        }
                    )*/
                })
                .catch(error => console.log(error));
    }

    return (
        <div>
            <HistoricalCurrencyForm addCurrency={addCurrency} />

            <table>
                <thead>
                    <tr>
                        <th>
                            <button type="button">Delete</button>
                        </th>
                        <th>
                            <button type="button">Source</button>
                        </th>
                        <th>
                            <button type="button">Target</button>
                        </th>
                        <th>
                            <button type="button">Date</button>
                        </th>
                        <th>
                            <button type="button">Exchange Rate</button>
                        </th>
                        <th>
                            <button type="button">Unit Bought</button>
                        </th>
                        <th>
                            <button type="button">Total Amount</button>
                        </th>
                        <th>
                            <button type="button">Current Amount</button>
                        </th>
                        <th>
                            <button type="button">Cost/Benefit</button>
                        </th>
                        <th>
                            <button type="button">Percentage Change</button>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {currencyList !== '' && currencyList.map((currency, index) => (
                        <Currency index={index} key={index} currency={currency} removeCurrency={removeCurrency} currentExchangeValues={currentExchangeValues}/>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
