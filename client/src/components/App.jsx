import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/monitor',
      success: (data) => {
        this.setState({
          services: JSON.parse(data)
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1> api gateway </h1>
      <div id="content">
        <iframe src="http://localhost:5001" scrolling="no" > </iframe>
        <br/> <br/><br/> <br/><br/> <br/>
        <iframe src="http://localhost:5002" scrolling="no" > </iframe>
        </div>
    </div>)
  }
}

export default App