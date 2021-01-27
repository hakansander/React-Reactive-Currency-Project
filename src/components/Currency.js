import React, {useState} from 'react';
import '../styles.css';

export const Currency = ({currency}) => {
    const [ccolor, setCcolor] = useState('yellow');

    const handleClick = (e) => {
        e.preventDefault()
        //handleToggle(e.currentTarget.id)
        setCcolor('blue')
    }

    return (
        <tr id={currency.id} name="currency" value={currency.id} onClick={handleClick} className={currency.base ? "todo strike" : "todo"}>
            <td>{currency.base}</td>
            <td>${currency.target}</td>
            <td style={{ backgroundColor: ccolor }}>{currency.rate}</td>
        </tr>
    );
};
