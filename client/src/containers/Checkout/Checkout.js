import React, { Component } from 'react';
import './Checkout.css';

class Checkout extends Component {
  state = {
    total: 0
  }

  submitHandler = (event) => {
    console.log(this.state.total)
    event.preventDefault();
  }

  changeHandler = (event) => {
    this.setState({ total: event.target.value })
  }

  render() {
    return (
      <div className={"Checkout"}>
        <h2>Checkout</h2>
        <form onSubmit={this.submitHandler}>
          <input 
            type="number"
            id="total"
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
