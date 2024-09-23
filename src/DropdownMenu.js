import React from "react";

class DropdownMenu extends React.Component {
  render() {
    const { currencies, selectedCurrency, onCurrencyChange, title } = this.props;

    return (
      <div className="dropbtn">
        <label className="dropdown">{title}</label>
        <div className="dropdown-content">
          <select
            value={selectedCurrency}
            onChange={(e) => onCurrencyChange(e.target.value)}
          >
            {Object.keys(currencies).map((currency) => (
              <option key={currency} value={currency}>
                {currency} - {currencies[currency]}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default DropdownMenu;
