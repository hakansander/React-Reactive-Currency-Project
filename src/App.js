import './App.css';
import {RealTimeCurrencyTable} from "./components/RealTimeCurrencyTable";
import {HistoricalCurrencyTable} from "./components/HistoricalCurrencyTable";
import {CurrencyDatePicker} from "./components/CurrencyDatePicker";
import React from "react";
import {HistoricalCurrencyForm} from "./components/HistoricalCurrencyForm";

function App() {
  return (
    <HistoricalCurrencyTable/>
  );
}

export default App;
