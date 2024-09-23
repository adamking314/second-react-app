import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="home-h1">
                    <h1>You made it to the home page</h1> 
                    <p>Click here to visit the Converter</p>
                    <Link to="/CurrencyConverter">Go to Currency Converter</Link>
                </div>
        );
    }
}

export default Home;
