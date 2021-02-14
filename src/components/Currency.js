import React, {useState, useRef, useEffect} from 'react';
import '../styles.css';
import {calcTotalAmount, reverseExchangeRate, calcDifference, calcDifferencePercentage} from "../utils/CurrencyUtils";

export const Currency = ({ currency, removeCurrency, index, currentExchangeValues }) => {
    const [ccolor, setCcolor] = useState('yellow');
    const [totalAmount, setTotalAmount] = useState(-1);
    const [currentTotalAmount, setCurrentTotalAmount] = useState(-1);
    const [difference, setDifference] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0);

    const prevRate = useRef();

    const handleClick = (e) => {
        e.preventDefault()
        //handleToggle(e.currentTarget.id)
        setCcolor('blue')
    }

    useEffect(() => {
        if (currency.rate !== prevRate.current) {
            if(currency.rate > prevRate.current) {
                setCcolor('green');
            }

            else if(currency.rate < prevRate.current) {
                setCcolor('red');
            }

            prevRate.current = currency.rate;
        }
    }, [currency.rate]);

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
        <tr id={currency.id} key={index} name="currency" value={currency.id} onClick={handleClick} className={currency.base ? "todo strike" : "todo"}>

            {/* Delete */}
            <td>
                <button style={{ background: "red" }} onClick={() => removeCurrency(index)}>x</button>
            </td>

            {/* Source */}
            <td>{currency.base}</td>

            {/* Target */}
            <td>{currency.target}</td>

            {/* Date */}
            <td>{currency.date}</td>

            {/* Exhange Rate */}
            <td style={{ backgroundColor: ccolor }}> {(parseFloat(currency.rate)).toFixed(2)} </td>

            {/* Unit Bought */}
            <td style={{ backgroundColor: ccolor }}> {(parseFloat(currency.amount)).toFixed(2)} </td>

            {/* Total Amount */}
            <td style={{ backgroundColor: ccolor }}> {totalAmount.toFixed(2)} </td>

            {/* Current Amount */}
            <td> {(currentTotalAmount).toFixed(2)} </td>

            {/* Cost/Benefit */}
            <td> {(difference).toFixed(2)} </td>

            {/* Percentage Change */}
            <td> {(percentageChange).toFixed(2)}% </td>

        </tr>
    );
};
