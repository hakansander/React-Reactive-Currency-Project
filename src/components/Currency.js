import React, {useState, useRef, useEffect} from 'react';
import '../styles.css';

export const Currency = ({currency}) => {
    const [ccolor, setCcolor] = useState('yellow');

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

    return (
        <tr id={currency.id} name="currency" value={currency.id} onClick={handleClick} className={currency.base ? "todo strike" : "todo"}>
            <td>{currency.base}</td>
            <td>{currency.target}</td>
            <td>{currency.date}</td>
            <td style={{ backgroundColor: ccolor }}>{(parseFloat(currency.rate)).toFixed(2)}</td>
            <td style={{ backgroundColor: ccolor }}>{(parseFloat(currency.amount)).toFixed(2)}</td>
            <td style={{ backgroundColor: ccolor }}>{(parseFloat(currency.rate) * parseFloat(currency.amount)).toFixed(2)}</td>
        </tr>
    );
};
