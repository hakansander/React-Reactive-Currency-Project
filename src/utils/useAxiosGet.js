import { useState, useEffect } from "react";
import axios from 'axios';

export const useAxiosGet = uri => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    axios.get(uri)
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

    return { loading, data, error };
}
