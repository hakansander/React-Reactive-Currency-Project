import React, {useEffect, useState} from 'react';
import '../styles.css';
import {Currency} from "./Currency";

const useSortableData = (currencyList, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        if(typeof currencyList != "undefined" && !Array.isArray(currencyList)) {
            return currencyList;
        }

        let sortableCurrencyList = [...currencyList];
        if (sortConfig !== null) {
            sortableCurrencyList.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableCurrencyList;
    }, [currencyList, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { sortableCurrencyList: sortedItems, requestSort, sortConfig };
};

export const RealTimeCurrencyTable = () => {
    const [listening, setListening] = useState(false);
    const [currencyList, setCurrencyList] = useState([]);

    const { sortableCurrencyList, requestSort, sortConfig } = useSortableData(currencyList);

    let eventSource = undefined;

    const currencyUrl = "http://hs-real-time-currency-backend.herokuapp.com/currency/random"

    useEffect(() => {
        if (!listening) {
            eventSource = new EventSource(currencyUrl);
            eventSource.onmessage = (event) => {
                const currencyList = JSON.parse(event.data);
                setCurrencyList(currencyList)
            }
            eventSource.onerror = (err) => {
                console.error("EventSource failed:", err);
                eventSource.close();
            }
            setListening(true)
        }
        return () => {
            console.log("event closed")
        }

    }, [])

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <table>
            <caption>Currencies</caption>
            <thead>
            <tr>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort('base')}
                        className={getClassNamesFor('base')}
                    >
                        Name
                    </button>
                </th>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort('target')}
                        className={getClassNamesFor('target')}
                    >
                        Price
                    </button>
                </th>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort('rate')}
                        className={getClassNamesFor('rate')}
                    >
                        In Stock
                    </button>
                </th>
            </tr>
            </thead>
            <tbody>
                {sortableCurrencyList.map((currency) => (
                    <Currency key={currency.base + currency.target} currency={currency} />
                ))}
            </tbody>
        </table>
    );
};

