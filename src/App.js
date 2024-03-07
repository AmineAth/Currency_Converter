import React, { useState, useEffect } from 'react';
import './index.css';
import { CountrNames } from './CurrencyNames';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState();
  const [convertedAmount, setConvertedAmount] = useState();
  const [currencies, setCurrencies] = useState([]);
  const currencyNames = CountrNames;
  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(response => response.json())
      .then(data => {
        setCurrencies(Object.keys(data.rates)); 
        setExchangeRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [exchangeRate, amount]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };


  return (
    <div className="App">
      <h1 className='text-3xl text-blue-400'>Currency Converter</h1>
      <div className="converter-container">

        <input type="number" value={amount} onChange={handleAmountChange} />
        <label>From :</label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency} ({currencyNames[currency]})
            </option>
          ))}
        </select>
        <label>To :</label>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency} ({currencyNames[currency]})
            </option>
          ))}
        </select>
      </div>
      <div className="result-container">
        <h2>Converted Amount: {convertedAmount}</h2>
      </div>
    </div>
  );
}

export default App;
