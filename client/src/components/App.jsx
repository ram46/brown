import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './Login.jsx';
import Logout from './Logout.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);

    this.state = {
      services: [],
      isLoggedIn: false
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

  handleLogin() {
      this.setState({
        isLoggedIn: true
      })
    }

  handleLogoutClick() {
      this.setState({
        isLoggedIn: false
      })
  }

  render () {
     var button;
     var home;

    if (!this.state.isLoggedIn) {
      button = <Login handleLogin={this.handleLogin}/>
    }

    if (this.state.isLoggedIn) {
      button = <Logout handleLogoutClick={this.handleLogoutClick} />
      home = <div>  <iframe src="http://localhost:7777/crud/" scrolling="no" > </iframe> <br/> <br/><br/> <br/><br/> <br/> <iframe src="http://localhost:7777/search/" scrolling="no" > </iframe> </div>
      }

    return (<div>
      <div id="content">
        <h1> api gateway </h1>
        {button}
        <br/>
        {home}
      </div>
    </div>)
  }
}

export default App





