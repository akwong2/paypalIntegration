import React, { Component } from 'react';
import axios from 'axios';
import 'url-search-params-polyfill';
import './Checkout.css';

class Checkout extends Component {
  state = {
    total: 0
  }

  submitHandler = (event) => {
    axios.post('/payment', {
      total: this.state.total
    })
    .then( res => {
      window.location.href = res.data;
    })
    .catch( err => {
      console.log(err)
    })
    event.preventDefault();
  }

  changeHandler = (event) => {
    this.setState({ total: event.target.value })
  }

  render() {
    let message;
    if (window.location.pathname === "/success") {
      message = <div className="Success">Thank you for your purchase!</div>
    }
    else if (window.location.pathname === "/cancel") {
      message = <div className="Cancel">Your order was cancelled</div>
    }
    return (
      <div className={"Checkout"}>
        <h2>Checkout</h2>
        {message}
        <form onSubmit={this.submitHandler}>
          <input 
            type="number"
            id="total"
            required
            onChange={this.changeHandler} />
          <input 
            type="submit" 
            value="Buy" />
        </form>
      </div>
    )
  }
}

export default Checkout;
