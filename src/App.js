import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: '',
      quotesToDisplay: []
    }
  }

  getQuotes() {
    let promise = axios.get('/api/quotes')
    promise.then((res) => {
      console.log(res)
      this.setState({
        quotesToDisplay: res.data
      })
    })
  }

  userInput(val) {
    this.setState({
      userInput: val
    })
  }

  addQuote() {
    let promise = axios.post(`/api/quotes`, { quote: this.state.userInput })
    promise.then(res => {
      this.setState({
        userInput: ''
      })
    })
  }

  delete(id) {
    let promise = axios.delete(`/api/quotes/${id}`)
    promise.then(res => {
      console.log(res)
      this.getQuotes()
    })
  }


  render() {
    let quotes = this.state.quotesToDisplay.map(quote => {
      return (
        <div key={quote.id}>
          <p>id: {quote.id}</p>
          <p>"{quote.quote}"</p>
          <button onClick={() => this.delete(quote.id)}>DELETE</button>
          <hr />
        </div>
      )
    })
    return (
      <div className="App">
        <button onClick={() => this.getQuotes()}>GET QUOTES</button>
        <br />
        <input value={this.state.userInput} onChange={(e) => this.userInput(e.target.value)} type="text" />
        <button onClick={() => this.addQuote()}>Add Quote</button>
        <hr />
        {quotes}
      </div>
    );
  }
}

export default App;
