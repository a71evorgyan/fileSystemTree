import React, { Component } from 'react';
import './path.css';
import ShowDir from './showdir';

class Path extends Component {
  state = {
    inputValue: '',
    files: [],
    word: {
      filePath: '',
      arrOfDirs: [],
      arrOfFiles: []
    },
    show: false

  
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
    // console.log(this.state.inputValue);
  }




  /////////////////////
  handleSubmit = (event) => {
    // const sendData = {path: this.state.inputValue};
    
    console.log("target", event.target.value);
    const sendData = {path: event.target.value};

    event.preventDefault();
    fetch('/api', {
      headers: {"Content-Type": "application/json"},
      method: 'POST',
      body: JSON.stringify(sendData),
      })
      .then(res => res.json())
      .then(word => this.setState({word, show: true}, () => console.log('object fetched...', word)))
      .catch(err => console.log("not correct"));
  
    


    
  }
  

  // componentDidMount() {
  
  // }

  render() {
    // console.log(this.state.word);
    const {inputValue, word} = this.state;
    console.log("word: ", this.state.word);
    console.log("files: ", this.state.word.files);
    console.log("path: ", this.state.word.filePath);
    return (

      <div>
        <form>
          <label htmlFor="path">Path</label>
          <input type="text" id="path" value={inputValue} onChange={this.handleChange}></input>
          {/* <input type="submit" value="Submit" /> */}
          <button value={inputValue} onClick = {this.handleSubmit}>send</button>
        </form>

        <div>
        <ul>
          {word.arrOfDirs.map(elem => <li>{elem}<button value={word.filePath + '/' + elem} onClick={this.handleSubmit}>+</button></li>)}
          {word.arrOfFiles.map((elem) => <li>{elem}</li>)}
          </ul>
        </div>

      </div>
    );
  }
}

export default Path;