import React, {useState, useRef, useEffect} from 'react';
import './Currency.css';
import {calcTotalAmount, reverseExchangeRate, calcDifference, calcDifferencePercentage} from "../utils/CurrencyUtils";

export const Currency = ({ currency, removeCurrency, index, currentExchangeValues }) => {
    const [totalAmount, setTotalAmount] = useState(-1);
    const [currentTotalAmount, setCurrentTotalAmount] = useState(-1);
    const [difference, setDifference] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0);

    const prevRate = useRef();

    const handleClick = (e) => {
        e.preventDefault()
        //handleToggle(e.currentTarget.id)
        //setCcolor('blue')
    }

    useEffect( () => {
        let historicalTotalAmount = calcTotalAmount(currency.rate, currency.amount);
        setTotalAmount(historicalTotalAmount);

        let reversedExchangeRate = reverseExchangeRate(currentExchangeValues.rates[currency.base]);
        let currentTotalAmount = calcTotalAmount(reversedExchangeRate, currency.amount);
        setCurrentTotalAmount(currentTotalAmount);

        setDifference(calcDifference(historicalTotalAmount, currentTotalAmount));

        setPercentageChange(calcDifferencePercentage(historicalTotalAmount, currentTotalAmount));
    }, [currency, currentExchangeValues])

    return (
        <tr id={currency.id} key={index} name="currency" value={currency.id} onClick={handleClick} className={"currencyRow"}>

            {/* Delete */}
            <td>
                <button style={{ background: "red" }} onClick={() => removeCurrency(index)}>x</button>
            </td>

            {/* Date */}
            <td>{currency.date}</td>

            {/* Exhange Rate */}
            <td> 1 {currency.base} <i className="fas fa-exchange-alt"></i> {(parseFloat(currency.rate)).toFixed(2)} {currency.target} </td>

            {/* Unit Bought */}
            <td> {(parseFloat(currency.amount)).toFixed(2)} {currency.base}</td>

            {/* Total Amount */}
            <td> {totalAmount.toFixed(2)} {currency.target}</td>

            {/* Current Amount */}
            <td> {(currentTotalAmount).toFixed(2)} {currency.target}</td>

            {/* Cost/Benefit */}
            <td> {(difference).toFixed(2)} {currency.target} </td>

            {/* Percentage Change */}
            <td style={{ backgroundColor: difference > 0 ? 'green' : 'red', width: 50, color: 'white'}}> {(percentageChange).toFixed(2)}% </td>

        </tr>
    );
};
