import React from 'react';
import $ from 'jquery';


class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this);
  }

  logout() {
    var auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then( () => {
    console.log('User signed out.');

    this.props.handleLogoutClick()

    $.ajax({
        url: '/logout',
        success: (res) => {
          console.log('ok great', res)
        },
        error: (err) => {
          console.log(err)
        }
      })
    })
  }


  render() {
    return <button onClick={this.logout}> logout </button>
  }
}


export default Logout;


