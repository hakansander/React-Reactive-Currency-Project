import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const CurrencyDatePicker = (params) => {
    return (
        <DatePicker selected={new Date(params.value)} onChange={date => params.onCurrencyDateSelect(date)} />
    );
};
