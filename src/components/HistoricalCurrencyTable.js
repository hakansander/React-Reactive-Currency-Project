import React, { useState } from 'react';
import {Currency} from "./Currency";
import {HistoricalCurrencyForm} from "./HistoricalCurrencyForm";

import data from "../../src/data.json";

export const HistoricalCurrencyTable = () => {
    const [currencyList, setCurrencyList] = useState(data);

    const addCurrency = (inputCurrency ) => {
        setCurrencyList(prevCurrencies => [
            ...prevCurrencies, { id: currencyList.length + 1, ...inputCurrency }
        ]);
    }

    return (
        <div>
            <HistoricalCurrencyForm addCurrency={addCurrency} />

            <table>
                <caption>Currencies</caption>
                <thead>
                <tr>
                    <th>
                        <button
                            type="button"
                        >
                            Source
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                        >
                            Target
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                        >
                            Rate
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {currencyList.map((currency) => (
                    <Currency key={currency.base + currency.target} currency={currency} />
                ))}
                </tbody>
            </table>
        </div>
    );

}
