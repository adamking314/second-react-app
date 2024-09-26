import React from "react";
import Chart from "chart.js";
import { json, checkStatus } from './utils';
import DropdownMenu from "./DropdownMenu";

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);



    this.state = {
      currencies: {},
      fromCurrency: 'USD' || 'fromCurrency',
      toCurrency: 'EUR' || 'toCurrency',
      amount: '',
      rate: null,
    };

    this.chartRef = React.createRef();

  }

  componentDidMount() {
    this.fetchCurrencies();
    this.getHistroicalRates();
  }

   componentDidUpdate(prevProps, prevState) {
    if (
      prevState.fromCurrency !== this.state.fromCurrency ||
      prevState.toCurrency !== this.state.toCurrency
    ) {
      this.getHistroicalRates();
    }
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

  getHistroicalRates = () => {
    const { fromCurrency, toCurrency } = this.state;
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime()-(30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    
    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`)
    .then(checkStatus)
    .then(json)
    .then((data => {
        if(data.error){
            throw new Error(data.error)
        }
    const chartLabels = Object.keys(data.rates);
    const chartData = Object.values(data.rates).map(rate => rate[toCurrency]);
    const chartLabel = `${fromCurrency}/${toCurrency}`;
    this.buildChart(chartLabels, chartData, chartLabel);
    }))
    .catch(error => console.error(error.message));
  }

  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext("2d")

    if (typeof this.chart !== 'undefined') {
        this.chart.destroy();
    }

    this.chart = new Chart(chartRef,{
        type: 'line',
        data : {
            labels,
            datasets:[
                {
                label: label,
                data,
                fill: false,
                tension: 0, 
                }
            ]
        },
        options: {
            responsive: true,
        }
    })
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
          
          <div className="chart-container">
          <canvas ref={this.chartRef} />
          </div>
          </div>
        </div>
    );
  }
}

export default CurrencyConverter;
