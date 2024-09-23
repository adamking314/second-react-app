import React from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import CurrencyConverter from './CurrencyConverter.js';
import Home from './Home.js';

import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <div className="main container">
       <h2 className="site-title"> Show Me the Money </h2>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/CurrencyConverter/">Currency Converter</Link>
            </li>
          </ul>
        </nav>
        <div className="App container">
        <div className="App-header">
          <div className="row">
            <h1>How rich are you in another country?</h1>
          </div>
          </div>
        <Route path="/" exact component={Home} />
        <Route path="/CurrencyConverter/" component={CurrencyConverter} />
      </div>
      <footer className="footer container">
  <h4 className="footerHeader">My Portfolio</h4>
  <ul> 
    <li>
      <a href="https://gleaming-parfait-97fd7e.netlify.app/" target="_blank" rel="noopener noreferrer">
        My Website
      </a>
    </li>
    <li>
      <a href="https://github.com/adamking314" target="_blank" rel="noopener noreferrer">
        My GitHub
      </a>
    </li>
  </ul>
</footer>
              </div>
        </Router>
  );

}

export default App;
