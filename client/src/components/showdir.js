import React, { Component } from 'react';


class ShowDir extends Component {
  state = {
    show: false,
    data: {
      filePath: '',
      arrOfDirs: [],
      arrOfFiles: []
    }
  } 

  showFiles = (event) => {
    
    console.log(event.target.value);
    const sendData = {path: event.target.value};
    fetch('api', {
      headers: {"Content-Type": "application/json"},
      method: 'POST',
      body: JSON.stringify(sendData),
    })
    .then(res => res.json())
    .then(data => this.setState({data, show: true}, () => console.log('object fetched...', data)))

  }
  render() {
    console.log("show", this.state.show);
    console.log('data', this.state.data.arrOfFiles);
    console.log("props", this.props);
    return (
      <React.Fragment>
         {this.props.dirs.map(item => (
          // <React.Fragment>
            <li>{item}<button value={this.props.path + '/' + item} onClick={this.showFiles}>show</button>
              {/* {this.state.show ? <ShowDir dirs = {this.data.arrOfDirs} path = {this.data.filePath}/> : null} */}
              {/* {this.state.show ? this.state.data.arrOfFiles.map(elem => <li>{elem }</li>) : null}  */}
              </li>
          // </React.Fragment>
        ))}
        
      </React.Fragment>
       
     
    );
  }
}

export default ShowDir;
