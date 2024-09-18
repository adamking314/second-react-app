import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

const Home = () => {
  return <h2>Home</h2>;
}

const About = () => {
  return <h2>About</h2>;
}

const Contact = () => {
  return <h2>Contact</h2>;
}

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1>Currency converter </h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/currency-converter/">Currency Converter</Link>
            </li>
            <li>
              <Link to="/exchange-rate/">Exchange Rate</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/contact/" component={Contact} />


          <div className="amount">
           <label> Amount: <input type="number"> </input> </label> 
          </div>
          <div className="from-to">
            <div className="from">
            <label> From: </label>
                    <div class="dropdown">
                       <button class="dropbtn">Dropdown</button>
                        <div class="dropdown-content">
                           <a href="#">USD</a>
                           <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                       </div>
                  </div>
              </div>
            <div className="to">
            <label> To: </label>
                      <div class="dropdown">
                        <button class="dropbtn">Dropdown</button>
                        <div class="dropdown-content">
                            <a href="#">USD</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                      </div>
                </div>
          </div>
          <div>
            <p> Amount in currency</p>
          </div>
      </div>
      <footer>

      </footer>
    </Router>
  );
}

export default App;