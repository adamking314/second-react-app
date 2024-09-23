import React from "react";
import { json, checkStatus } from './utils';
import DropdownMenu from "./DropdownMenu";

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: {},
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: '',
      rate: null,
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    fetch("https://api.frankfurter.app/currencies")
      .then(checkStatus)
      .then(json)
      .then((response) => {
        this.setState({ currencies: response });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  handleAmountChange = (e) => {
    this.setState({ amount: e.target.value });
  }

  handleCurrencyChange = (type, selectedCurrency) => {
    this.setState({ [type]: selectedCurrency });
  }

  swapCurrencies = () => {
    this.setState((prevState) => ({
      fromCurrency: prevState.toCurrency,
      toCurrency: prevState.fromCurrency,
    }));
  }

  convertCurrency = () => {
    const { fromCurrency, toCurrency, amount } = this.state;
    if (!amount) return;

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      .then(checkStatus)
      .then(json)
      .then((response) => {
        this.setState({ rate: response.rates[toCurrency] });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    const { amount, currencies, fromCurrency, toCurrency, rate } = this.state;

    return (
      <div className="currency-container">
        <h2 className="mb-1">Currency Converter</h2>
        <div className="row">
            <div className="amount">
              <label>Amount: </label>
              <input
                value={amount}
                onChange={this.handleAmountChange}
                type="number"
              />
            </div>
            <div className="dropdown-menus col-12"> 
            <div className="from col-sm-4">
            <DropdownMenu
              currencies={currencies}
              selectedCurrency={fromCurrency}
              onCurrencyChange={(currency) => this.handleCurrencyChange('fromCurrency', currency)}
              title="From:"
            />
            </div>
            <div className="swapButton col-sm-4">
            <button className="btn" onClick={this.swapCurrencies}>Swap</button>
            </div>
            <div className="to col-sm-4">
            <DropdownMenu
              currencies={currencies}
              selectedCurrency={toCurrency}
              onCurrencyChange={(currency) => this.handleCurrencyChange('toCurrency', currency)}
              title="To:"
            />
            </div>
            </div>
            <div className="convertButton">
            <button className="btn" onClick={this.convertCurrency}>Convert</button>

            {rate && <p>Converted Amount: {rate}</p>}
            </div>
            <div className="outputArea"></div>
          </div>
        </div>
    );
  }
}

export default CurrencyConverter;
